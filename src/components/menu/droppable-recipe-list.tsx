import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { SortableRecipe } from './sortable-recipe';
import { type MenuRecipeDroppable } from './types';

type RecipeListProps = {
	items: MenuRecipeDroppable[];
	day: string;
	handleRemoveItem: (recipeId: number) => void;
};

const DroppableRecipeList = ({
	items,
	day,
	handleRemoveItem
}: RecipeListProps) => {
	const itemIds = useMemo(
		() => items.map(item => item.recipe.recipe_id),
		[items]
	);
	const { setNodeRef } = useDroppable({
		id: day,
		data: { type: 'droppable' }
	});

	return (
		<div className="mt-3 flex flex-col gap-1" ref={setNodeRef}>
			<SortableContext items={itemIds}>
				{items.map(item => (
					<SortableRecipe
						key={item.recipe.recipe_id}
						id={item.recipe.recipe_id}
						item={item}
						handleRemoveItem={handleRemoveItem}
					/>
				))}
			</SortableContext>
		</div>
	);
};

export default DroppableRecipeList;
{
	/* <div className="mt-3 flex flex-col gap-1">
			<SortableContext items={items}>
				{items.map((item, index) => (
					<SortableRecipe key={index} id={index} item={item} />
				))}
			</SortableContext>
		</div> */
}
