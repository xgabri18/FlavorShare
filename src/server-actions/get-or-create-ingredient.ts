'use server';
import { eq } from 'drizzle-orm';

import { type Ingredient } from '@/components/form/recipe-form-schema';
import { db } from '@/db';
import { ingredients } from '@/db/schema/ingredient';

export const GetOrCreateIngredient = async (data: Ingredient) => {
	const existing = await db
		.select()
		.from(ingredients)
		.where(eq(ingredients.name, data.name.toLowerCase()));
	if (existing.length === 1) {
		return existing[0].id;
	}
	const res = await db
		.insert(ingredients)
		.values({ name: data.name.toLowerCase() })
		.returning({ id: ingredients.id });
	return res[0].id;
};
