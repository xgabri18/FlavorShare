'use server';

import { eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { categories } from '@/db/schema/category';
import { recipeCategories } from '@/db/schema/recipeCategory';

export type Category = {
	id: number;
	name: string;
};

export const fetchCategoriesForRecipe = async ({
	recipeId
}: {
	recipeId: number;
}): Promise<Category[]> => {
	const categoryIds = await db
		.select({
			id: recipeCategories.category_id
		})
		.from(recipeCategories)
		.where(eq(recipeCategories.recipe_id, recipeId))
		.all();

	const categoryIdsArray = categoryIds.map(cat => cat.id);
	return db
		.select()
		.from(categories)
		.where(inArray(categories.id, categoryIdsArray))
		.all();
};
