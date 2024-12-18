'use client';

import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';

import {
	createNewRating,
	fetchRatingForRecipeByUser,
	updateRating
} from './actions';

type InteractableRatingProps = {
	recipeId: number;
	userId: string;
};

// More about rating https://mui.com/material-ui/react-rating/

export const InteractableRating = ({
	recipeId,
	userId
}: InteractableRatingProps) => {
	const [value, setValue] = useState<number | null>(0);
	const [hover, setHover] = useState(-1);
	const [ratingId, setRatingId] = useState<number | null>(null);

	useEffect(() => {
		const fetchRating = async () => {
			const userRating = await fetchRatingForRecipeByUser({ recipeId, userId });
			if (userRating) {
				setValue(userRating.rating);
				setRatingId(userRating.id);
			}
		};

		fetchRating();
	}, [recipeId, userId]);

	const handleRatingChange = async (
		event: React.SyntheticEvent,
		newValue: number | null
	) => {
		setValue(newValue);

		if (newValue !== null) {
			if (ratingId === null) {
				// Create new rating
				const newRating = {
					recipe_id: recipeId,
					user_id: userId,
					rating: newValue
				};
				await createNewRating({ newRating });
			} else {
				// Update existing rating
				const editedRating = {
					id: ratingId,
					rating: newValue
				};
				await updateRating({ editedRating });
			}
		}
	};

	// Rating needs to be enclosed in div (or something) otherwise there is a Hydration error on page reload (F5)
	return (
		<div className="content-center pt-1">
			<Rating
				name="recipe-rating"
				value={value ?? 0}
				defaultValue={0}
				size="large"
				onChange={handleRatingChange}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
			/>
		</div>
	);
};
