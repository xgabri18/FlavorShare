import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { recipes } from "./recipe"; // Import the recipes table for relationships

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  recipes: many(recipes),  // One category can have many recipes
}));
