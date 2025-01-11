import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';

export const dynamic = 'force-dynamic';

export const GET = async () => {
	try {
		const recipesList = await db
			.select({
				recipe_id: recipes.id,
				recipe_name: recipes.name
			})
			.from(recipes)
			.all();

		return Response.json(recipesList);
	} catch (error) {
		console.log(error);
		return Response.json({ error: 'Something went wrong' }, { status: 400 });
	}
};
