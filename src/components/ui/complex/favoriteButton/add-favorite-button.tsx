'use client';
import { Button } from '@/components/ui/button';
import { addToFavorite } from '@/components/ui/complex/favoriteButton/actions';

type addProps = {
	userId: string;
	recipeId: number;
};

const AddFavoriteButton = (props: addProps) => {
	const onClick = async () => {
		await addToFavorite(props.userId, props.recipeId);
	};
	return <Button onClick={onClick}>Add favorite </Button>;
};
export default AddFavoriteButton;
