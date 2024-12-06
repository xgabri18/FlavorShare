import { relations } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { recipes } from "./recipe";
import { ingredients } from "./ingredient";

export const usedIngredients = sqliteTable("used_ingredients", {
  id: integer("id").primaryKey().notNull(),
  recipe_id: integer("recipe_id").notNull(),
  ingredient_id: integer("ingredient_id").notNull(),
  quantity: text("quantity").notNull(),
});

export const usedIngredientRelations = relations(usedIngredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [usedIngredients.recipe_id],
    references: [recipes.id],
  }),
  ingredient: one(ingredients, {
    fields: [usedIngredients.ingredient_id],
    references: [ingredients.id],
  }),
}));
