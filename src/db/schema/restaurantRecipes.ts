import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { restaurants } from './restaurant';
import { recipes } from './recipe';
import { relations } from 'drizzle-orm';

export const restaurantRecipes = sqliteTable('restaurantRecipes', {
  id: integer('id').primaryKey().notNull(),
  restaurant_id: integer('restaurant_id').notNull(),
  day_of_week: text('day_of_week').notNull(),
  recipe_id: integer('recipe_id').notNull(),
});


export const restaurantRecipeRelations = relations(restaurantRecipes, ({ one }) => ({
    restaurant: one(restaurants, {
      fields: [restaurantRecipes.restaurant_id],
      references: [restaurants.id],
    }),
    recipe: one(recipes, {
      fields: [restaurantRecipes.recipe_id],
      references: [recipes.id],
    }),
  }));