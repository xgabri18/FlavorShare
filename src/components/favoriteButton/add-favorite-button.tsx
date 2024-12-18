'use client';
import { Button } from '@/components/ui/button';
import { addToFavorite } from '@/components/favoriteButton/actions';

type addProps = {
	userId: string;
	recipeId: number;
};

const AddFavoriteButton = (props: addProps) => {
	const onClick = async () => {
		await addToFavorite(props.userId, props.recipeId);
	};
	return (
		<Button onClick={onClick} className="text-white hover:bg-blue-400">
			Add to favorite
		</Button>
	);
};
export default AddFavoriteButton;
