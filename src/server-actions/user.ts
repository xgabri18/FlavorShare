import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { restaurants } from '@/db/schema/restaurant';

export const isUserRestaurantOwner = async (
	user_id: string,
	restaurant_id: number
) => {
	try {
		const restaurant = await db
			.select({ owner_id: restaurants.user_id })
			.from(restaurants)
			.where(eq(restaurants.id, restaurant_id))
			.all();

		return restaurant[0].owner_id === user_id;
	} catch (error) {
		console.error('Error fetching restaurant owner', error);
		throw new Error('Failed to fetch restaurant owner');
	}
};
