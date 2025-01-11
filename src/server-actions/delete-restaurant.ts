'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { restaurants } from '@/db/schema/restaurant';
import { users } from '@/db/schema/user';

export const deleteRestaurant = async (id: number) => {
	await db.delete(restaurants).where(eq(restaurants.id, id));
	await db
		.update(users)
		.set({ restaurant_id: null })
		.where(eq(users.restaurant_id, id));
};
