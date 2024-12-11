import { relations } from "drizzle-orm";
import { sqliteTable, integer,text } from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { recipes } from "./recipe";

export const favoriteRecipes = sqliteTable("favorite_recipes", {
  id: integer("id").primaryKey().notNull(),
  user_id: text("user_id").notNull(),
  recipe_id: integer("recipe_id").notNull(),
});

export const favoriteRecipeRelations = relations(favoriteRecipes, ({ one }) => ({
  user: one(users, {
    fields: [favoriteRecipes.user_id],
    references: [users.id],
  }),
  recipe: one(recipes, {
    fields: [favoriteRecipes.recipe_id],
    references: [recipes.id],
  }),
}));
