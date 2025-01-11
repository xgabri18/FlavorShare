'use server';

import { type RecipeForm } from '@/components/form/recipe-form-schema';
import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { usedIngredients } from '@/db/schema/usedIngredient';
import { recipeCategories } from '@/db/schema/recipeCategory';

import { GetOrCreateIngredient } from './get-or-create-ingredient';
import { GetOrCreateCategory } from './get-or-create-category';

export const CreateRecipe = async (
	data: RecipeForm & { imageUrl: string | null; userId: string }
) => {
	const recipe = await db
		.insert(recipes)
		.values({
			name: data.name,
			description: data.description,
			preparation_time: data.preparation_time,
			visibility: data.visibility,
			user_id: data.userId,
			photo_url: data.imageUrl,
			steps: data.recipeSteps
		})
		.returning({ id: recipes.id });

	for (const ingredient of data.ingredients) {
		const newIngredientId = await GetOrCreateIngredient(ingredient);
		await db.insert(usedIngredients).values({
			recipe_id: recipe[0].id,
			ingredient_id: newIngredientId,
			quantity: `${ingredient.amount}|${ingredient.unit}`
		});
	}
	for (const category of data.categories) {
		const newCategory = await GetOrCreateCategory(category);
		await db.insert(recipeCategories).values({
			recipe_id: recipe[0].id,
			category_id: newCategory.id
		});
	}
};
