import { redirect } from 'next/navigation';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { favoriteRecipes } from '@/db/schema/favoriteRecipe';
import { RecipeTile } from '@/components/ui/tiles/recipe-tile';
import { restaurants } from '@/db/schema/restaurant';
import { RestaurantTile } from '@/components/ui/tiles/restaurantTile';

const Page = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/auth/signing');
	}
	const userId = session.user.id ?? '';
	const userName = session.user.name ?? 'Unknown';

	const userRestaurants = await db
		.select()
		.from(restaurants)
		.where(eq(restaurants.user_id, userId));
	const allRecipes = await db.select().from(recipes);
	const userRecipes = allRecipes.filter(recipe => recipe.user_id === userId);

	const favoriteRecipesIds = (
		await db
			.select()
			.from(favoriteRecipes)
			.where(eq(favoriteRecipes.user_id, userId))
	).map(fav => fav.recipe_id);

	const favRecipes = allRecipes.filter(recipe =>
		favoriteRecipesIds.includes(recipe.id)
	);

	return (
		<div className="p-4">
			<h1 className="text-center text-2xl font-bold text-gray-800">
				{userName}
			</h1>

			<Accordion activeIndex={0} className="mt-6 w-full">
				<AccordionTab
					header={
						<span className="block w-full border border-gray-300 bg-gray-200 px-4 py-2 text-lg font-semibold text-black shadow-md">
							Favorite Recipes
						</span>
					}
				>
					<div className="grid grid-cols-1 gap-4 p-3 md:grid-cols-2 lg:grid-cols-3">
						{favRecipes.map(recipe => (
							<RecipeTile
								key={recipe.id}
								id={recipe.id}
								image={recipe.photo_url}
								title={recipe.name}
								rating={recipe.rating ?? 0}
								preparationTime={recipe.preparation_time}
							/>
						))}
					</div>
				</AccordionTab>

				<AccordionTab
					header={
						<span className="block w-full border border-gray-300 bg-gray-200 px-4 py-2 text-lg font-semibold text-black shadow-md">
							My Recipes
						</span>
					}
				>
					<div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
						{userRecipes.map(recipe => (
							<RecipeTile
								key={recipe.id}
								id={recipe.id}
								image={recipe.photo_url}
								title={recipe.name}
								rating={recipe.rating ?? 0}
								preparationTime={recipe.preparation_time}
							/>
						))}
					</div>
				</AccordionTab>
				{userRestaurants.length > 0 && (
					<AccordionTab
						header={
							<span className="block w-full border border-gray-300 bg-gray-200 px-4 py-2 text-lg font-semibold text-black shadow-md">
								My restaurants
							</span>
						}
					>
						<div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-5">
							{userRestaurants.map(restaurant => (
								<RestaurantTile
									key={restaurant.id}
									restaurantId={restaurant.id}
									restaurantName={restaurant.name}
									restaurantLocation={restaurant.location}
								/>
							))}
						</div>
					</AccordionTab>
				)}
			</Accordion>
		</div>
	);
};

export default Page;
