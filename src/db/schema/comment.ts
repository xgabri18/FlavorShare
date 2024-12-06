import { relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { recipes } from "./recipe";
import { users } from "./user";

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey().notNull(),
  recipe_id: integer("recipe_id").notNull(),
  user_id: integer("user_id").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  recipe: one(recipes, {
    fields: [comments.recipe_id],
    references: [recipes.id],
  }),
  user: one(users, {
    fields: [comments.user_id],
    references: [users.id],
  }),
}));
