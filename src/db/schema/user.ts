import { relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { recipes } from "./recipe";
import { comments } from "./comment";
import { favoriteRecipes } from "./favoriteRecipe";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey().notNull(),
  github_id: text("github_id").unique(),
  name: text("name").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  comments: many(comments),
  favoriteRecipes: many(favoriteRecipes),
}));
