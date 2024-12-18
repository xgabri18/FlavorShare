import { Button } from '@/components/ui/button';
import { removeFavorite } from '@/components/favoriteButton/actions';

type removeProps = {
	userId: string;
	recipeId: number;
};

const RemoveFavoriteButton = (props: removeProps) => {
	const onClick = async () => {
		await removeFavorite(props.userId, props.recipeId);
	};
	return (
		<Button
			onClick={onClick}
			className="hover:bg-red-400"
			type="button"
			variant="destructive"
		>
			Remove favorite
		</Button>
	);
};
export default RemoveFavoriteButton;
