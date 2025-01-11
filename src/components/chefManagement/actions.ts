'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { users } from '@/db/schema/user';

export const toggleChef = async (userId: string, chef: boolean) => {
	revalidatePath('/user');
	try {
		const updatedUser = await db
			.update(users)
			.set({ chef })
			.where(eq(users.id, userId))
			.returning();

		if (updatedUser.length === 0) {
			throw new Error('User not found or update failed');
		}

		return updatedUser[0];
	} catch (error) {
		console.error('Error updating user chef status:', error);
		throw new Error('Failed updating user chef status');
	}
};

export const leaveRestaurant = async (userId: string) => {
	revalidatePath('/user');
	try {
		const updatedUser = await db
			.update(users)
			.set({ restaurant_id: null })
			.where(eq(users.id, userId))
			.returning();

		if (updatedUser.length === 0) {
			throw new Error('User not found or update failed');
		}

		return updatedUser[0];
	} catch (error) {
		console.error('Error updating user restaurant:', error);
		throw new Error('Failed updating user restaurant');
	}
};
