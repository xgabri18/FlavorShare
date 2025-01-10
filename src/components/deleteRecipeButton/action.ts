'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { usedIngredients } from '@/db/schema/usedIngredient';
import { recipeCategories } from '@/db/schema/recipeCategory';
import { ingredients } from '@/db/schema/ingredient';
import { categories } from '@/db/schema/category';
import { deleteImage } from '@/server-actions/delete-image';
import { restaurantRecipes } from '@/db/schema/restaurantRecipes';
import { favoriteRecipes } from '@/db/schema/favoriteRecipe';
import { comments } from '@/db/schema/comment';

export const deleteRecipe = async (recipeId: number) => {
	try {
		const dbIngredients = await db.select().from(usedIngredients).where(eq(usedIngredients.recipe_id, recipeId));
		await db.delete(usedIngredients).where(eq(usedIngredients.recipe_id, recipeId));
		dbIngredients.forEach(async (dbIngredient) => {
			if ((await db.select().from(usedIngredients).where(eq(usedIngredients.ingredient_id, dbIngredient.ingredient_id))).length === 0) {
				await db.delete(ingredients).where(eq(ingredients.id, dbIngredient.ingredient_id))
			}
		})
		const dbCategories = await db.select().from(recipeCategories).where(eq(recipeCategories.recipe_id, recipeId));
		await db.delete(recipeCategories).where(eq(recipeCategories.recipe_id, recipeId));
		dbCategories.forEach(async (dbCategory) => {
			if ((await db.select().from(recipeCategories).where(eq(recipeCategories.category_id, dbCategory.category_id))).length === 0) {
				await db.delete(categories).where(eq(categories.id, dbCategory.category_id));
			}
		})
		await db.delete(restaurantRecipes).where(eq(restaurantRecipes.recipe_id, recipeId));
		await db.delete(favoriteRecipes).where(eq(favoriteRecipes.recipe_id, recipeId));
		await db.delete(comments).where(eq(comments.recipe_id, recipeId));
		
		const recipe = await db.select().from(recipes).where(eq(recipes.id, recipeId));
		await db.delete(recipes).where(eq(recipes.id, recipeId));
		if (recipe[0].photo_url !== null) {
			await deleteImage(recipe[0].photo_url);
		}
		revalidatePath(`/browse`);
	} catch (error) {
		console.error('Error deleting recipe:', error);
		throw new Error('Failed to delete recipe');
	}
};
