import DroppableRecipeList from './droppable-recipe-list';
import { MenuRecipeDroppable } from './types';

export const DailyMenu = ({
	recipes,
	title,
	handleRemoveItem
}: {
	recipes: MenuRecipeDroppable[];
	title: string;
	handleRemoveItem: (recipeId: number) => void;
}) => {
	return (
		<div
			id={title.toLowerCase()}
			className="rounded-lg border border-gray-300 p-4"
		>
			<h2 className="text-xl font-semibold">{title}</h2>
			{recipes.length === 0 && (
				<p className="text-sm text-gray-400">
					No recipes added for this day yet!
				</p>
			)}
			<DroppableRecipeList
				items={recipes}
				day={title}
				handleRemoveItem={handleRemoveItem}
			/>
		</div>
	);
};
