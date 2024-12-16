import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { type InferSelectModel } from 'drizzle-orm';

export const ingredients = sqliteTable('ingredients', {
	id: integer('id').primaryKey().notNull(),
	name: text('name').notNull()
});

export type Ingredient = InferSelectModel<typeof ingredients>;
