'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { restaurantRecipes } from '@/db/schema/restaurantRecipes';
import { recipes } from '@/db/schema/recipe';
import { ingredients } from '@/db/schema/ingredient';
import { usedIngredients } from '@/db/schema/usedIngredient';

type Ingredient = {
	ingredient: string;
	amount: number;
	unit: string;
};

type WeeklyMenu = Record<string, Ingredient[]>;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export async function fetchWeeklyMenuWithIngredients(
	restaurantId: number
): Promise<WeeklyMenu> {
	const weeklyMenu = await db
		.select({
			recipeName: recipes.name,
			ingredientName: ingredients.name,
			quantity: usedIngredients.quantity
		})
		.from(restaurantRecipes)
		.innerJoin(recipes, eq(restaurantRecipes.recipe_id, recipes.id))
		.innerJoin(usedIngredients, eq(usedIngredients.recipe_id, recipes.id))
		.innerJoin(ingredients, eq(usedIngredients.ingredient_id, ingredients.id))
		.where(eq(restaurantRecipes.restaurant_id, restaurantId));

	const formattedMenu: WeeklyMenu = weeklyMenu.reduce((acc, item) => {
		const { recipeName, ingredientName, quantity } = item;

		const [amountStr, ...unitArr] = quantity.split('|');
		const amount = parseFloat(amountStr);
		const unit = unitArr.join(' ');

		if (!acc[recipeName]) {
			acc[recipeName] = [];
		}

		acc[recipeName].push({
			ingredient: ingredientName,
			amount,
			unit
		});

		return acc;
	}, {} as WeeklyMenu);

	return formattedMenu;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export async function fetchWeeklyMenuData(restaurantId: number) {
	const weeklyRecipes = await db
		.select()
		.from(restaurantRecipes)
		.innerJoin(recipes, eq(restaurantRecipes.recipe_id, recipes.id))
		.where(eq(restaurantRecipes.restaurant_id, restaurantId));

	const daysOfWeek = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday'
	];

	const groupedByDay = daysOfWeek.reduce(
		(acc: Record<string, string[]>, day) => {
			acc[day] = [];
			return acc;
		},
		{} as Record<string, string[]>
	);

	weeklyRecipes.forEach(recipe => {
		const day = recipe.restaurantRecipes.day_of_week;
		groupedByDay[day].push(recipe.recipes.name);
	});

	return groupedByDay;
}
