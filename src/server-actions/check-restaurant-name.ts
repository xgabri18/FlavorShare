'use server';

import { db } from '@/db';
import { restaurants } from '@/db/schema/restaurant';
import { eq } from 'drizzle-orm';


export const checkRestaurantName = async (restaurantName: string) => {
	return (await db.select().from(restaurants).where(eq(restaurants.name, restaurantName))).length === 0;
};
