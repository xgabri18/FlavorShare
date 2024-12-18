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
	return <Button onClick={onClick}>Edit</Button>;
};
export default EditRecipeButton;
