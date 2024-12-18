'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

type editProps = {
	recipeId: number;
};

const EditRecipeButton = ({ recipeId }: editProps) => {
	const router = useRouter();
	const onClick = () => {
		router.push(`/recipe/${recipeId}/update`);
	};
	return (
		<Button
			onClick={onClick}
			className="w-auto rounded-md bg-stone-200 text-blue-700 lg:bg-blue-700 lg:text-white"
		>
			Edit
		</Button>
	);
};
export default EditRecipeButton;
