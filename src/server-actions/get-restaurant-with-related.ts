'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { restaurants } from '@/db/schema/restaurant';
import { users } from '@/db/schema/user';

type RestaurantWithRelated = {
	id: number;
	user_id: string;
	name: string;
	location: string;
	cheffs: { name: string }[];
};

const getRestaurantWithRelated = async (id: number, userId: string) => {
	const restaurantRows = await db
		.select()
		.from(restaurants)
		.where(eq(restaurants.id, Number(id)));
	if (restaurantRows.length !== 1 || restaurantRows[0].user_id !== userId) {
		return null;
	}
	const restaurant = restaurantRows[0];
	const cheffRows = await db
		.select({ name: users.name })
		.from(users)
		.where(eq(users.restaurant_id, restaurant.id));

	return {
		cheffs: cheffRows,
		...restaurant
	} as RestaurantWithRelated;
};

export default getRestaurantWithRelated;
