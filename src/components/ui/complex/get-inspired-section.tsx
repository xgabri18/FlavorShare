'use server';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { gte } from 'drizzle-orm';

import { RecipeTile } from '../tiles/recipe-tile';

// Function generated with chatgpt
async function getTopRecipes() {
	// Step 1: Calculate 95th percentile
	const allRatings = await db
		.select({ rating: recipes.rating })
		.from(recipes)
		.all();
	// Filter out null values
	const ratings = allRatings
		.map(row => row.rating)
		.filter((rating): rating is number => rating !== null);
	//const ratings = allRatings.map(row => row.rating);
	const percentile95 = calculatePercentile(ratings, 0.95);

	// Step 2: Filter recipes above 95th percentile
	const filteredRecipes = await db
		.select()
		.from(recipes)
		.where(gte(recipes.rating, percentile95))
		.all();

	// Step 3: Shuffle and pick 15 random recipes
	const shuffledRecipes = shuffleArray(filteredRecipes);
	const selectedRecipes = shuffledRecipes.slice(0, 15);

	return selectedRecipes;
}

// Function generated with chatgpt
function calculatePercentile(arr: number[], percentile: number) {
	arr.sort((a, b) => a - b);
	const index = Math.ceil(percentile * arr.length) - 1;
	return arr[index];
}

// Function generated with chatgpt
function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const GetInspiredSection = async () => {
	const data = await getTopRecipes();

	return (
		<div className="flex border-t-2 border-t-gray-500 p-5">
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
				{data.map(recipe => (
					<RecipeTile
						key={recipe.id}
						id={recipe.id}
						title={recipe.name}
						image={recipe.photo_url}
						rating={recipe.rating ?? 0}
					/>
				))}
			</div>
		</div>
	);
};
