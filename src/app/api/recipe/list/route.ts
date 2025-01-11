import { eq, or } from 'drizzle-orm';
import { type NextRequest } from 'next/server';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
	try {
		const url = new URL(req.url);
		const userId = url.searchParams.get('user_id') ?? '0';

		const recipesList = await db
			.select({
				recipe_id: recipes.id,
				recipe_name: recipes.name
			})
			.from(recipes)
			.where(or(eq(recipes.visibility, 'public'), eq(recipes.user_id, userId)))
			.all();

		return Response.json(recipesList);
	} catch (error) {
		console.log(error);
		return Response.json({ error: 'Something went wrong' }, { status: 400 });
	}
};
