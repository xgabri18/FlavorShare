'use server';

import { and, eq, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { type RestaurantForm } from '@/components/form/restaurant-form-schema';
import { db } from '@/db';
import { restaurants } from '@/db/schema/restaurant';
import { users } from '@/db/schema/user';

import { checkCheffsExist } from './check-cheffs-exist';
import { checkRestaurantName } from './check-restaurant-name';

export const addRestaurant = async ({
	cheffs,
	userId,
	...data
}: RestaurantForm & { userId: string }) => {
	revalidatePath(`/user`);
	await checkCheffsExist(cheffs);
	await checkRestaurantName(data.name);
	const result = await db
		.insert(restaurants)
		.values({ ...data, user_id: userId })
		.returning({ id: restaurants.id });
	if (result.length !== 1) {
		throw new Error('Unable to insert restaurant.');
	}
	for (const cheff of cheffs) {
		const count = (
			await db
				.update(users)
				.set({ restaurant_id: result[0].id })
				.where(
					and(
						eq(users.name, cheff.name),
						eq(users.chef, true),
						isNull(users.restaurant_id)
					)
				)
		).rowsAffected;
		if (count !== 1) {
			throw new Error('Unexpected cheff count.');
		}
	}
};
