import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const restaurants = sqliteTable('restaurants', {
	id: integer('id').primaryKey().notNull(),
	user_id: text('user_id').notNull(),
	name: text('name').notNull(),
	location: text('location').notNull()
});
