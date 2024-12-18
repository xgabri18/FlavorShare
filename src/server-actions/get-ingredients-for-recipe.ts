'use server';

import { db } from '@/db';
import { ingredients } from '@/db/schema/ingredient';
import { usedIngredients } from '@/db/schema/usedIngredient';
import { eq } from 'drizzle-orm';

export type Ingredient = {
	id: number;
	name: string;
	quantity: string;
};

export const fetchIngredientsForRecipe = async ({
	recipeId
}: {
	recipeId: number;
}): Promise<Ingredient[]> => {
	const ingredientList = await db
		.select({
			id: ingredients.id,
			name: ingredients.name,
			quantity: usedIngredients.quantity
		})
		.from(usedIngredients)
		.innerJoin(ingredients, eq(usedIngredients.ingredient_id, ingredients.id))
		.where(eq(usedIngredients.recipe_id, recipeId))
		.all();

	return ingredientList;
};
