'use client';

import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { Star } from 'lucide-react';

type RatingProps = {
	currentUsersRating: number;
};

// More about rating https://mui.com/material-ui/react-rating/

export const InteractableRating = () => {
	const [value, setValue] = useState<number | null>(0);
	const [hover, setHover] = useState(-1);

	// Rating needs to be enclosed in div (or something) otherwise there is a Hydration error on page reload (F5)
	return (
		<div>
			<Rating
				name="simple-controlled"
				value={value}
				size="large"
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			/>
		</div>
	);
};
