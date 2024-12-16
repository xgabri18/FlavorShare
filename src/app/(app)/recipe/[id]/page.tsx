'use server';

import Image from 'next/image';
import { Clock, Star } from 'lucide-react';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { users } from '@/db/schema/user';
import { InteractableRating } from '@/components/ui/rating';
import { auth } from '@/auth';
import RemoveOrAddFavorite from '@/components/ui/complex/favoriteButton/remove-or-add-favorite';
import {
	type FavoriteRecipe,
	favoriteRecipes
} from '@/db/schema/favoriteRecipe';

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

	return (
		<div className="flex flex-col px-60 py-20">
			<div className="flex justify-between">
				<div className="flex flex-1 bg-slate-500">
					<div className="relative flex h-80 w-80">
						<Image
							aria-hidden
							src="/image.svg" //{image ?? '/image.svg'}
							alt="Meal picture"
							fill
						/>
						<div className="ml-2 mt-2 flex gap-1">
							<Star />
							<span>{singleRecipe.rating}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-1 flex-col justify-start gap-3 bg-red-400">
					<h1>{singleRecipe.name}</h1>
					<span>{singleAuthor.name}</span>
					<div className="flex gap-2">
						<Clock />
						<span>{singleRecipe.preparation_time}min</span>
					</div>
					<span>Categories</span>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-2 bg-blue-500">
				<div>
					<h2>Ingredients</h2>
					<span>List of ingredients</span>
				</div>
				<div>
					<h2>Description</h2>
					<span>{singleRecipe.description}</span>
				</div>
				<div>
					<h2>Instructions</h2>
					<span>{singleRecipe.description}</span>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-2 bg-green-500">
				<h2>Comments</h2>
				<span>
					Rating from material ui https://mui.com/material-ui/react-rating/
				</span>
				<InteractableRating />
			</div>
			{userId && (
				<RemoveOrAddFavorite
					favoriteRecipes={favorRecipes}
					userId={userId}
					recipeId={singleRecipe.id}
				/>
			)}
		</div>
	);
};

export default Page;
