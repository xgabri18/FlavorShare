// recipeCategory.ts
import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { recipes } from './recipe'; // Import the recipes table
import { categories } from './category'; // Import the categories table

export const recipeCategories = sqliteTable('recipe_categories', {
	id: integer('id').primaryKey().notNull(),
	recipe_id: integer('recipe_id').notNull(),
	category_id: integer('category_id').notNull()
});

import { type InferSelectModel, relations } from 'drizzle-orm';

export const recipeCategoryRelations = relations(
	recipeCategories,
	({ one }) => ({
		recipe: one(recipes, {
			fields: [recipeCategories.recipe_id],
			references: [recipes.id]
		}),
		category: one(categories, {
			fields: [recipeCategories.category_id],
			references: [categories.id]
		})
	})
);

export type RecipeCategory = InferSelectModel<typeof recipeCategories>;
