import React from 'react';
import { Loader, X } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

import { useDeleteImageMutation } from '@/queries/delete-image';

import { Button } from './button';

const RecipeImage = ({
	setImageUrlNull,
	...props
}: {
	setImageUrlNull: () => void;
	src: string;
	alt: string;
	width: number;
	height: number;
}) => {
	const mutation = useDeleteImageMutation();
	return (
		<div className="relative w-1/3">
			<Image {...props} alt={props.alt} />
			<Button
				type="button"
				className="absolute right-2 top-2 rounded-xl border border-2 border-black bg-black hover:bg-gray-400"
				variant="default"
				onClick={() =>
					mutation.mutate(props.src ?? '', {
						onSuccess: () => {
							toast.success('Image was deleted.');
							setImageUrlNull();
						},
						onError: e => {
							toast.error(`An error occurred while deleting image.`);
							console.log(e);
						}
					})
				}
				onSubmit={() => false}
			>
				{mutation.isPending ? <Loader className="animate-spin" /> : <X />}
			</Button>
		</div>
	);
};

export default RecipeImage;
