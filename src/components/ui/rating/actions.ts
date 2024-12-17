'use server';

import { db } from '@/db';
import { ratings } from '@/db/schema/ratings';
import { and, eq } from 'drizzle-orm';
import { EditRating, NewRating, Rating } from './types';
import { log } from 'console';

export const createNewRating = async ({
	newRating
}: {
	newRating: NewRating;
}) => {
	try {
		await db.insert(ratings).values(newRating).run();
	} catch (error) {
		console.error('Error adding a rating:', error);
		throw new Error('Failed to add a rating');
	}
};

export const updateRating = async ({
	editedRating
}: {
	editedRating: EditRating;
}) => {
	try {
		await db
			.update(ratings)
			.set({ rating: editedRating.rating })
			.where(eq(ratings.id, editedRating.id))
			.run();
	} catch (error) {
		console.error('Error editing a rating:', error);
		throw new Error('Failed to edit a rating');
	}
};

export const fetchRatingForRecipeByUser = async ({
	recipeId,
	userId
}: {
	recipeId: number;
	userId: string;
}): Promise<Rating | null> => {
	const rating = await db
		.select({
			id: ratings.id,
			recipe_id: ratings.recipe_id,
			user_id: ratings.user_id,
			rating: ratings.rating
		})
		.from(ratings)
		.where(and(eq(ratings.recipe_id, recipeId), eq(ratings.user_id, userId)))
		.all();

	return rating.length > 0 ? rating[0] : null;
};
