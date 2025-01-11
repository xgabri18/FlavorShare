import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';

import { type MenuRecipeDroppable } from './types';

export const SortableRecipe = ({
	id,
	item,
	handleRemoveItem
}: {
	id: number;
	item: MenuRecipeDroppable;
	handleRemoveItem: (recipeId: number) => void;
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			className="text-md relative m-1 flex touch-none justify-between rounded-md bg-stone-100 p-2 shadow-sm ring-1 ring-stone-300"
		>
			<div className="w-full">{item.recipe.recipe_name}</div>
			{item.day !== 'none' && (
				<button
					type="button"
					onClick={() => handleRemoveItem(item.recipe.recipe_id)}
					className="text-gray-400 transition-colors duration-200 hover:text-red-500"
				>
					<X />
				</button>
			)}
		</div>
	);
};
