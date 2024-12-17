'use client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { deleteRecipe } from '@/components/deleteRecipeButton/action';

type deleteProps = {
	recipeId: number;
};

const DeleteRecipeButton = (props: deleteProps) => {
	const router = useRouter();
	const onClick = async () => {
		await deleteRecipe(props.recipeId);
		router.push('/');
		toast.message('successfully deleted!');
	};

	return (
		<Button onClick={onClick} variant="destructive">
			Delete Recipe
		</Button>
	);
};
export default DeleteRecipeButton;
