import { redirect } from 'next/navigation';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { favoriteRecipes } from '@/db/schema/favoriteRecipe';
import { RecipeTile } from '@/components/ui/tiles/recipe-tile';

const Page = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/auth/signing');
	}
	const userId = session.user.id ?? '';
	const userName = session.user.name ?? 'Unknown';

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
		<div>
			<h1>{userName}</h1>
			<Accordion activeIndex={0}>
				<AccordionTab header="Favorite Recipes">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{favRecipes.map(recipe => (
							<RecipeTile
								key={recipe.id}
								id={recipe.id}
								image={recipe.photo_url}
								title={recipe.name}
								rating={recipe.rating ?? 0}
							/>
						))}
					</div>
				</AccordionTab>
				<AccordionTab header="My Recipes">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{userRecipes.map(recipe => (
							<RecipeTile
								key={recipe.id}
								id={recipe.id}
								image={recipe.photo_url}
								title={recipe.name}
								rating={recipe.rating ?? 0}
							/>
						))}
					</div>
				</AccordionTab>
			</Accordion>
		</div>
	);
};
export default Page;