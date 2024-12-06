import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const ingredients = sqliteTable("ingredients", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
});
