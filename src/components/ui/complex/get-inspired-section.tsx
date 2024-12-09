'use server';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { RecipeTile } from '../tiles/recipe-tile';

export const GetInspiredSection = async () => {
	const data = await db
		.select()
		.from(recipes)
		.orderBy(recipes.rating) // Order by highest rating
		.limit(15) // Limit to at most 15 records
		.all(); // Fetch all matching rows (limited to 15)

	return (
		<div className="flex border-t-2 border-t-gray-500 p-5">
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
				{data.map(recipe => (
					<RecipeTile
						key={recipe.id}
						title={recipe.name}
						image={recipe.photo_url}
						rating={recipe.rating ?? 0}
					/>
				))}
			</div>
		</div>
	);
};
