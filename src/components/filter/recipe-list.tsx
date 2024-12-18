import { type Recipe } from '@/db/schema/recipe';
import { RecipeTile } from '@/components/ui/tiles/recipe-tile';

type RecipeListProps = {
	recipes: Recipe[];
};

export const RecipeList = ({ recipes }: RecipeListProps) => (
	<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{recipes.map(recipe => (
			<RecipeTile
				key={recipe.id}
				id={recipe.id}
				image={recipe.photo_url}
				title={recipe.name}
				rating={recipe.rating ? recipe.rating : 0}
				preparationTime={recipe.preparation_time}
			/>
		))}
	</div>
);
