'use server';
import { eq } from 'drizzle-orm';

import { type RecipeForm } from '@/components/form/recipe-form-schema';
import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { recipeCategories } from '@/db/schema/recipeCategory';
import { categories as dbCategories } from '@/db/schema/category';
import { ingredients as dbIngredients } from '@/db/schema/ingredient';
import { usedIngredients } from '@/db/schema/usedIngredient';

import { GetOrCreateCategory } from './get-or-create-category';
import { GetOrCreateIngredient } from './get-or-create-ingredient';

const updateCategories = async (
	newCategories: { category: string }[],
	recipeId: number
) => {
	const existingCategories = await db
		.select({
			name: dbCategories.name,
			recipeCategoryId: recipeCategories.id,
			categoryId: dbCategories.id
		})
		.from(recipeCategories)
		.innerJoin(dbCategories, eq(dbCategories.id, recipeCategories.category_id))
		.where(eq(recipeCategories.recipe_id, recipeId));
	for (const cat of existingCategories) {
		if (!newCategories.find(c => c.category.toLowerCase() === cat.name)) {
			await db
				.delete(recipeCategories)
				.where(eq(recipeCategories.id, cat.recipeCategoryId));
			if (
				(
					await db
						.select()
						.from(recipeCategories)
						.where(eq(recipeCategories.category_id, cat.recipeCategoryId))
				).length === 0
			) {
				await db
					.delete(dbCategories)
					.where(eq(dbCategories.id, cat.categoryId));
			}
		}
	}
	for (const c of newCategories) {
		if (
			!existingCategories.find(cat => cat.name === c.category.toLowerCase())
		) {
			const newCategory = await GetOrCreateCategory(c);
			await db
				.insert(recipeCategories)
				.values({ recipe_id: recipeId, category_id: newCategory.id });
		}
	}
};

const getExistingIngredients = async (recipeId: number) =>
	await db
		.select({
			name: dbIngredients.name,
			quantity: usedIngredients.quantity,
			ingredientId: dbIngredients.id,
			usedIngredientId: usedIngredients.id
		})
		.from(usedIngredients)
		.innerJoin(
			dbIngredients,
			eq(dbIngredients.id, usedIngredients.ingredient_id)
		)
		.where(eq(usedIngredients.recipe_id, recipeId));

const updateIngredients = async (
	newIngredients: { name: string; amount: number; unit: string }[],
	recipeId: number
) => {
	const existingIngredients = await getExistingIngredients(recipeId);
	for (const ingdnt of existingIngredients) {
		const ingredient = newIngredients.find(
			i => i.name.toLowerCase() === ingdnt.name
		);
		if (!ingredient) {
			await db
				.delete(usedIngredients)
				.where(eq(usedIngredients.id, ingdnt.usedIngredientId));
			if (
				(
					await db
						.select()
						.from(dbIngredients)
						.where(eq(dbIngredients.id, ingdnt.ingredientId))
				).length === 0
			) {
				await db
					.delete(dbIngredients)
					.where(eq(dbIngredients.id, ingdnt.ingredientId));
			}
		} else {
			await db
				.update(usedIngredients)
				.set({
					quantity: `${ingredient.amount}|${ingredient.unit}`
				})
				.where(eq(usedIngredients.id, ingdnt.usedIngredientId));
		}
	}
	const afterUpdateIngredients = await getExistingIngredients(recipeId);
	for (const i of newIngredients) {
		if (
			!afterUpdateIngredients.find(
				ingdnt => ingdnt.name === i.name.toLowerCase()
			)
		) {
			const newIngredient = await GetOrCreateIngredient(i);
			await db.insert(usedIngredients).values({
				ingredient_id: newIngredient,
				recipe_id: recipeId,
				quantity: `${i.amount}|${i.unit}`
			});
		}
	}
};

const updateRecipe = async ({
	imageUrl,
	recipeId,
	categories,
	ingredients,
	recipeSteps,
	...data
}: RecipeForm & { imageUrl: string | null; recipeId: number }) => {
	const res = await db
		.update(recipes)
		.set({ ...data, steps: recipeSteps, photo_url: imageUrl })
		.where(eq(recipes.id, recipeId))
		.returning();
	if (res.length === 0) {
		throw new Error('No such recipe');
	}
	await updateCategories(categories, recipeId);
	await updateIngredients(ingredients, recipeId);
};

export default updateRecipe;
