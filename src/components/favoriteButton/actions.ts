'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { favoriteRecipes } from '@/db/schema/favoriteRecipe';

export const addToFavorite = async (userId: string, recipeId: number) => {
	try {
		await db.insert(favoriteRecipes).values({
			user_id: userId,
			recipe_id: recipeId
		});
		revalidatePath(`/recipe/${recipeId}`);
	} catch (error) {
		console.error('Error inserting gift:', error);
		throw new Error('Failed to create gift');
	}
};

export const removeFavorite = async (userId: string, recipeId: number) => {
	try {
		await db
			.delete(favoriteRecipes)
			.where(
				eq(favoriteRecipes.user_id, userId) &&
					eq(favoriteRecipes.recipe_id, recipeId)
			);
		revalidatePath(`/recipe/${recipeId}`);
	} catch (error) {
		console.error('Error inserting gift:', error);
		throw new Error('Failed to create gift');
	}
};
