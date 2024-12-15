'use client';
import { useEffect, useState } from 'react';

import { type FavoriteRecipe } from '@/db/schema/favoriteRecipe';
import AddFavoriteButton from '@/components/ui/complex/favoriteButton/add-favorite-button';
import RemoveFavoriteButton from '@/components/ui/complex/favoriteButton/remove-favorite-button';

type removeOrAddFavorite = {
	favoriteRecipes: FavoriteRecipe[];
	recipeId: number;
	userId: string;
};

const RemoveOrAddFavorite = (props: removeOrAddFavorite) => {
	const [addFavorite, setAddFavorite] = useState<boolean>(true);

	useEffect(() => {
		const isFavorite = props.favoriteRecipes.some(
			recipe => recipe.recipe_id === props.recipeId
		);
		setAddFavorite(!isFavorite);
	}, [props.favoriteRecipes, props.recipeId]);
	return (
		<div>
			{addFavorite ? (
				<AddFavoriteButton userId={props.userId} recipeId={props.recipeId} />
			) : (
				<RemoveFavoriteButton userId={props.userId} recipeId={props.recipeId} />
			)}
		</div>
	);
};
export default RemoveOrAddFavorite;
