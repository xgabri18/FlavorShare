import { Button } from '@/components/ui/button';
import { removeFavorite } from '@/components/ui/complex/favoriteButton/actions';

type removeProps = {
	userId: string;
	recipeId: number;
};

const RemoveFavoriteButton = (props: removeProps) => {
	const onClick = async () => {
		await removeFavorite(props.userId, props.recipeId);
	};
	return <Button onClick={onClick}>remove favorite</Button>;
};
export default RemoveFavoriteButton;
