'use server';

import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { type Recipe, recipes } from '@/db/schema/recipe';

import { RecipeTile } from '../tiles/recipe-tile';

const shuffleArray = (array: Recipe[]): Recipe[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const getTopRecipes = async () => {
	const top100Recipes = await db
		.select()
		.from(recipes)
		.where(eq(recipes.visibility, 'public'))
		.orderBy(desc(recipes.rating))
		.limit(100)
		.all();

	const shuffledRecipes = shuffleArray(top100Recipes);
	return shuffledRecipes.slice(0, 15);
};

export const GetInspiredSection = async () => {
	const data = await getTopRecipes();

	return (
		<div className="flex flex-col border-t-2 border-t-gray-500 p-5">
			<h2 className="mb-5 flex flex-1 justify-center text-2xl font-semibold text-gray-700">
				Today&#39;s picks
			</h2>
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-5">
				{data.map(recipe => (
					<RecipeTile
						key={recipe.id}
						id={recipe.id}
						title={recipe.name}
						image={recipe.photo_url}
						rating={recipe.rating ?? 0}
						preparationTime={recipe.preparation_time}
					/>
				))}
			</div>
		</div>
	);
};
