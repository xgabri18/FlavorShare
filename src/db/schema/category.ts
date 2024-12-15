import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { recipes } from "./recipe"; // Import the recipes table for relationships
import { recipeCategories } from "./recipeCategory";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  recipes: many(recipeCategories),  // One category can have many recipes
}));
