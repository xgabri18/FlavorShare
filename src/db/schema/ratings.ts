import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { users } from "./user";
import { recipes } from "./recipe";

export const ratings = sqliteTable("ratings", {
  id: integer("id").primaryKey().notNull(),
  user_id: text("user_id").notNull(), 
  recipe_id: integer("recipe_id").notNull(), 
  rating: integer("rating").notNull(), 
});

export const ratingRelations = relations(ratings, ({ one }) => ({
  user: one(users, {
    fields: [ratings.user_id],
    references: [users.id],
  }),
  recipe: one(recipes, {
    fields: [ratings.recipe_id],
    references: [recipes.id],
  }),
}));
