import { z } from 'zod';

const ingredientSchema = z.object({
	name: z.string(),
	amount: z.number().nonnegative(),
	unit: z.string()
});

const categorySchema = z.object({
	category: z.string()
});

const visibilitySchema = z.enum(['public', 'private']);

export const recipeFormSchema = z.object({
	name: z.string(),
	description: z.string(),
	preparation_time: z.number().nonnegative(),
	visibility: visibilitySchema,
	categories: z.array(categorySchema),
	ingredients: z.array(ingredientSchema)
});

export type Ingredient = z.infer<typeof ingredientSchema>;
export type RecipeForm = z.infer<typeof recipeFormSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type Category = z.infer<typeof categorySchema>;
