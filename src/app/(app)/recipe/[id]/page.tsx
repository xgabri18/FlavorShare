'use server';

import Image from 'next/image';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { users } from '@/db/schema/user';
import { InteractableRating } from '@/components/ui/rating/rating';
import { auth } from '@/auth';
import RemoveOrAddFavorite from '@/components/favoriteButton/remove-or-add-favorite';
import {
	type FavoriteRecipe,
	favoriteRecipes
} from '@/db/schema/favoriteRecipe';
import { CommentsParent } from '@/components/ui/complex/comments/comments-parent-component';
import DeleteRecipeButton from '@/components/deleteRecipeButton/delete-recipe-button';
import { SmallTile } from '@/components/ui/tiles/small-tile';
import EditRecipeButton from '@/components/editButton/edit-recipe-button';
import BackButton from '@/components/back-button';
import { fetchCategoriesForRecipe } from '@/server-actions/get-categories-for-recipe';
import { fetchIngredientsForRecipe } from '@/server-actions/get-ingredients-for-recipe';

type RecipePageProps = {
	params: Promise<{
		id: string;
	}>;
};

const getFavoriteRecipes = async (
	userId: string | undefined
): Promise<FavoriteRecipe[]> => {
	if (userId) {
		return db
			.select()
			.from(favoriteRecipes)
			.where(eq(favoriteRecipes.user_id, userId));
	} else {
		return [];
	}
};

const Page = async ({ params }: RecipePageProps) => {
	const session = await auth();
	const { id } = await params; // This is apparently required from Next 15 https://stackoverflow.com/questions/79143162/route-locale-used-params-locale-params-should-be-awaited-before-using
	const recipe = await db
		.select()
		.from(recipes)
		.where(eq(recipes.id, Number(id)))
		.limit(1);
	const singleRecipe = recipe[0];

	const author = await db
		.select()
		.from(users)
		.where(eq(users.id, singleRecipe.user_id))
		.limit(1);

	const userId = session?.user?.id;

	const favorRecipes = await getFavoriteRecipes(userId);

	if (
		singleRecipe.visibility === 'private' &&
		userId !== singleRecipe.user_id
	) {
		return <div>This recipe is private</div>;
	}

	const singleAuthor = author[0];

	const categories = await fetchCategoriesForRecipe({ recipeId: Number(id) });
	const ingredients = await fetchIngredientsForRecipe({ recipeId: Number(id) });

	return (
		<div className="flex h-full flex-col bg-stone-200 p-10 lg:mx-52">
			<div className="flex flex-1 justify-between">
				<BackButton />
				{userId === singleAuthor.id && (
					<div className="space-x-2">
						<EditRecipeButton recipeId={singleRecipe.id} />
						<DeleteRecipeButton recipeId={singleRecipe.id} />
					</div>
				)}
			</div>
			<div className="flex flex-col lg:flex-row">
				<div className="flex w-full flex-1 justify-center lg:justify-start">
					<div className="lg:h-128 lg:w-128 relative flex h-56 w-56 rounded-lg bg-white">
						<Image
							aria-hidden
							src={singleRecipe.photo_url ?? '/image.svg'}
							alt="Meal picture"
							fill
							className="rounded-lg"
						/>
					</div>
				</div>
				<div className="flex flex-col justify-start gap-4 lg:w-2/3 lg:pl-8">
					<div>
						<h1 className="text-4xl font-semibold">{singleRecipe.name}</h1>
						<span className="ml-6 text-lg">by {singleAuthor.name}</span>
					</div>
					<div className="flex gap-2">
						<Clock />
						<span>{singleRecipe.preparation_time}min</span>
						<div className="flex gap-2">
							<Star />
							<span>{singleRecipe.rating?.toPrecision(2) ?? 0}</span>
						</div>
					</div>
					<div>
						<p>{singleRecipe.description}</p>
					</div>
				</div>
			</div>
			{userId && (
				<div className="mt-4 lg:mt-0">
					<span className="text-sm">
						Liked this recipe? Don't forget to rate it.
					</span>
					<div className="flex content-center gap-5">
						<InteractableRating recipeId={Number(id)} userId={userId} />
						<RemoveOrAddFavorite
							favoriteRecipes={favorRecipes}
							userId={userId}
							recipeId={singleRecipe.id}
						/>
					</div>
				</div>
			)}
			<div className="mt-2 flex flex-col gap-3">
				<div className="flex flex-col">
					<h2 className="text-xl font-medium">Categories</h2>
					<div className="flex flex-wrap gap-2">
						{categories.map(category => (
							<SmallTile key={category.id} content={category.name} />
						))}
					</div>
				</div>
				<div>
					<h2 className="text-xl font-medium">Ingredients</h2>
					<div className="flex flex-col">
						{ingredients.map(ingredient => (
							<span key={ingredient.id}>
								{ingredient.quantity.replace('|', '')} - {ingredient.name}
							</span>
						))}
					</div>
				</div>
				<div>
					<h2 className="text-xl font-medium">Instructions</h2>
					<span>{singleRecipe.steps}</span>
				</div>
			</div>

			<div className="mt-4">
				<CommentsParent
					recipeId={Number(id)}
					currentUser={
						session === null ||
						session.user === undefined ||
						userId === undefined
							? null
							: {
									name: session.user.name ?? '',
									image: session.user.image ?? null,
									id: userId
								}
					}
				/>
			</div>
		</div>
	);
};

export default Page;
