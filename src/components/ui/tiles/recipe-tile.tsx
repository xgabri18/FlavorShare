import Image from 'next/image';

import { Clock, Star } from 'lucide-react';
import Link from 'next/link';

export type RecipeTileProps = {
	id: number;
	image: string | null;
	title: string;
	rating: number;
	preparationTime: number;
};

export const RecipeTile = ({
	id,
	image,
	title,
	rating,
	preparationTime
}: RecipeTileProps) => (
	<Link
		href={`/recipe/${id}`}
		className="flex h-full transform flex-col gap-3 rounded-xl border-2 border-stone-200 bg-stone-100 text-black shadow-black transition duration-300 hover:scale-105 hover:shadow-xl"
	>
		<div className="relative h-48 w-full">
			<Image
				aria-hidden
				src={image ?? '/image.svg'}
				alt="Meal picture"
				fill
				className="rounded-lg"
				objectFit="cover"
			/>
		</div>
		<div className="flex h-1/3 flex-col justify-between gap-2 px-5 pb-2">
			<h3 className="text-lg font-semibold">{title}</h3>
			<div className="flex gap-2">
				<Clock />
				<span>{preparationTime}min</span>
				<Star />
				<span>{rating.toPrecision(2)}</span>
			</div>
		</div>
	</Link>
);
