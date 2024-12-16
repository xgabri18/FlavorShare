import React from 'react';
import { Loader, X } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

import { useDeleteImageMutation } from '@/queries/delete-image';

import { Button } from './button';
import { RedXButton } from './red-x-button';

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
		<div className="relative w-full">
			<Image {...props} alt={props.alt} className='w-full px-5'/>
			<RedXButton 
			className='absolute right-8 top-3 border border-2 border-black'
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
			isLoading={mutation.isPending}
			/>
		</div>
	);
};

export default RecipeImage;
