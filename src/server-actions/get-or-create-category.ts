'use server';
import { eq } from 'drizzle-orm';

import { type Category } from '@/components/form/recipe-form-schema';
import { db } from '@/db';
import { categories } from '@/db/schema/category';

export const GetOrCreateCategory = async (data: Category) => {
	const category = await db
		.select()
		.from(categories)
		.where(eq(categories.name, data.category));
	if (category.length === 1) {
		return category[0];
	}
	return (
		await db
			.insert(categories)
			.values({ name: data.category.toLowerCase() })
			.returning()
	)[0];
};
