import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { restaurantRecipes } from '@/db/schema/restaurantRecipes';
import { and, eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { z, ZodError } from 'zod';

export const dynamic = 'force-dynamic';

export const GET = async (
	req: NextRequest, // this is necessary because otherwise the params dont work???
	{ params }: { params: { id: string } }
) => {
	const { id } = await params;

	try {
		const restaurantId = parseInt(id);
		const daysOfWeek = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];
		const recipesByDay: Record<string, any[]> = {};
		for (const day of daysOfWeek) {
			const recipesList = await db
				.select({
					recipe_id: recipes.id,
					recipe_name: recipes.name
				})
				.from(recipes)
				.innerJoin(
					restaurantRecipes,
					eq(restaurantRecipes.recipe_id, recipes.id)
				)
				.where(
					and(
						eq(restaurantRecipes.restaurant_id, restaurantId),
						eq(restaurantRecipes.day_of_week, day.toLowerCase())
					)
				)
				.orderBy(restaurantRecipes.id) // will this work for the ordering?
				.all();

			recipesByDay[day] = recipesList;
		}

		return Response.json(recipesByDay);
	} catch (error) {
		console.log(error);
		return Response.json({ error: 'Something went wrong' }, { status: 400 });
	}
};

const requestBodySchema = z.object({
	menu: z
		.array(
			z.object({
				recipeIds: z.array(z.number().gte(0)),
				day_of_week: z.enum([
					'monday',
					'tuesday',
					'wednesday',
					'thursday',
					'friday',
					'saturday',
					'sunday'
				])
			})
		)
		.length(7)
});

export const POST = async (
	req: NextRequest, // this is necessary because otherwise the params dont work???
	{ params }: { params: { id: string } }
) => {
	const body = await req.json();
	const { id } = await params;

	try {
		const request = requestBodySchema.parse(body);
		const restaurantId = parseInt(id);
		await DeleteMenuBeforeUpdate(restaurantId);

		for (const dailyMenu of request.menu) {
			for (const recipeId of dailyMenu.recipeIds) {
				const newRestaurantRecipe = {
					recipe_id: recipeId,
					restaurant_id: restaurantId,
					day_of_week: dailyMenu.day_of_week
				};
				await db.insert(restaurantRecipes).values(newRestaurantRecipe).run();
			}
		}
		return Response.json({ status: 201 });
	} catch (error) {
		console.log(error);

		if (error instanceof ZodError) {
			return Response.json({ error: error.errors }, { status: 400 });
		}

		return Response.json({ error: 'Something went wrong' }, { status: 500 });
	}
};

const DeleteMenuBeforeUpdate = async (restaurantId: number) => {
	await db
		.delete(restaurantRecipes)
		.where(eq(restaurantRecipes.restaurant_id, restaurantId))
		.run();
};
