import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { type InferSelectModel, relations } from 'drizzle-orm';

import { recipes } from './recipe';
import { recipeCategories } from './recipeCategory';

export const categories = sqliteTable('categories', {
	id: integer('id').primaryKey().notNull(),
	name: text('name').notNull()
});

export const categoryRelations = relations(categories, ({ many }) => ({
	recipes: many(recipeCategories) // One category can have many recipes
}));

export type Category = InferSelectModel<typeof categories>;
