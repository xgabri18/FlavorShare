import Image from 'next/image';

import { Star } from 'lucide-react';
import Link from 'next/link';

export type RecipeTileProps = {
	id: number;
	image: string | null;
	title: string;
	rating: number;
};

export const RecipeTile = ({ id, image, title, rating }: RecipeTileProps) => (
	<Link
		href={`/recipe/${id}`}
		className="flex transform flex-col gap-3 rounded-lg bg-black text-white shadow-black transition duration-300 hover:scale-105 hover:shadow-xl"
	>
		<div className="relative h-48 w-48">
			<Image
				aria-hidden
				src="/image.svg" //{image ?? '/image.svg'}
				alt="Meal picture"
				fill
				objectFit="cover"
			/>
		</div>
		<div className="px-5 pb-5">
			<h3 className="text-lg font-bold text-green-600">{title}</h3>
			<div className="flex gap-2">
				<Star />
				<span>{rating}</span>
			</div>
		</div>
	</Link>
);