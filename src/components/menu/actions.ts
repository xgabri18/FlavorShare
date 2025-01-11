import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { restaurants } from '@/db/schema/restaurant';
import { restaurantRecipes } from '@/db/schema/restaurantRecipes';

export const getRestaurantNameAction = async (
	restaurantId: number
): Promise<string> => {
	try {
		const restaurantName = await db
			.select({ restaurant_name: restaurants.name })
			.from(restaurants)
			.where(eq(restaurants.id, restaurantId))
			.all();

		return restaurantName[0].restaurant_name;
	} catch (error) {
		console.error('Error fetching restaurant name', error);
		throw new Error('Failed to fetch a restaurant name');
	}
};

export const getMenuForRestaurantAction = async (
	restaurantId: number
): Promise<Record<string, { recipe_name: string }[]>> => {
	try {
		const daysOfWeek = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];
		const recipesByDay: Record<string, any[]> = {};
		for (const day of daysOfWeek) {
			recipesByDay[day] = await db
				.select({
					recipe_name: recipes.name
				})
				.from(recipes)
				.innerJoin(
					restaurantRecipes,
					eq(restaurantRecipes.recipe_id, recipes.id)
				)
				.where(
					and(
						eq(restaurantRecipes.restaurant_id, restaurantId),
						eq(restaurantRecipes.day_of_week, day.toLowerCase())
					)
				)
				.orderBy(restaurantRecipes.id) // will this work for the ordering?
				.all();
		}
		return recipesByDay;
	} catch (error) {
		console.error('Error fetching restaurant menu from server action.', error);
		throw new Error('Error fetching restaurant menu from server action.');
	}
};
