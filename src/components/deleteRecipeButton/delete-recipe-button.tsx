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
		<Button
			onClick={onClick}
			variant="destructive"
			className="w-24 rounded-md bg-stone-200 text-red-500 hover:text-red-700 lg:bg-red-600 lg:text-white lg:hover:bg-red-400 lg:hover:text-white"
		>
			Delete Recipe
		</Button>
	);
};
export default DeleteRecipeButton;
