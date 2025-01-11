'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { categories } from '@/db/schema/category';
import { ingredients } from '@/db/schema/ingredient';
import { recipes } from '@/db/schema/recipe';
import { recipeCategories } from '@/db/schema/recipeCategory';
import { usedIngredients } from '@/db/schema/usedIngredient';

type RecipeWithRelated = {
	id: number;
	name: string;
	description: string;
	preparation_time: number;
	visibility: 'public' | 'private';
	categories: { category: string }[];
	ingredients: { name: string; amount: number; unit: string }[];
	imageUrl: string;
	recipeSteps: string;
};

const getRecipeWithRelated = async (id: number, userId: string) => {
	const recipeRows = await db
		.select()
		.from(recipes)
		.where(eq(recipes.id, Number(id)));
	if (recipeRows.length !== 1 || recipeRows[0].user_id !== userId) {
		return null;
	}
	const recipe = recipeRows[0];
	const categoryRows = await db
		.select({ category: categories.name })
		.from(categories)
		.innerJoin(
			recipeCategories,
			eq(categories.id, recipeCategories.category_id)
		)
		.where(eq(recipeCategories.recipe_id, recipe.id));
	const ingredientRows = await db
		.select({
			quantity: usedIngredients.quantity,
			name: ingredients.name
		})
		.from(ingredients)
		.innerJoin(
			usedIngredients,
			eq(ingredients.id, usedIngredients.ingredient_id)
		)
		.where(eq(usedIngredients.recipe_id, recipe.id));

	return {
		id: recipe.id,
		name: recipe.name,
		description: recipe.description,
		preparation_time: recipe.preparation_time,
		visibility: recipe.visibility === 'public' ? 'public' : 'private',
		categories: categoryRows,
		ingredients: ingredientRows.map(data => {
			const amountUnit = data.quantity.split('|');
			return {
				name: data.name,
				amount: Number(amountUnit[0]),
				unit: amountUnit[1]
			};
		}),
		imageUrl: recipe.photo_url,
		recipeSteps: recipe.steps
	} as RecipeWithRelated;
};

export default getRecipeWithRelated;
