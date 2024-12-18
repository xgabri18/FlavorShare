'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';

export const deleteRecipe = async (recipeId: number) => {
	try {
		await db.delete(recipes).where(eq(recipes.id, recipeId));
		revalidatePath(`/browse`);
	} catch (error) {
		console.error('Error deleting gift:', error);
		throw new Error('Failed to delete gift');
	}
};
