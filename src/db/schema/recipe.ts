import { relations } from "drizzle-orm";
import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { usedIngredients } from "./usedIngredient";
import { comments } from "./comment";
import { favoriteRecipes } from "./favoriteRecipe";
import { recipeCategories } from "./recipeCategory"; 

export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  user_id: text("user_id").notNull(),
  description: text("description").notNull(),
  preparation_time: integer("preparation_time").notNull(),
  rating: real("rating"),
  visibility: text("visibility").notNull(),
  photo_url: text("photo_url"),
});

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  author: one(users, {
    fields: [recipes.user_id],
    references: [users.id],
  }),
  usedIngredients: many(usedIngredients),
  comments: many(comments),
  favoriteRecipes: many(favoriteRecipes),
  categories: many(recipeCategories), // Linking the many-to-many relation to recipe_categories table
}));
