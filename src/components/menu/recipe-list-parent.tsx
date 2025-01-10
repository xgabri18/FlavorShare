import { cn } from '@/lib/cn';
import { Search } from 'lucide-react';
import { useState } from 'react';
import DroppableRecipeList from './droppable-recipe-list';
import { MenuRecipeDroppable } from './types';

export const RecipeListParent = ({
	className,
	searchRecipes,
	handleRemoveItem
}: {
	className?: string;
	searchRecipes: MenuRecipeDroppable[];
	handleRemoveItem: (recipeId: number) => void;
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredRecipes = searchRecipes.filter(recipe =>
		recipe.recipe.recipe_name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<div className={cn(className, 'border border-gray-300 p-4 md:rounded-lg')}>
			<SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
			<div className="relative">
				{filteredRecipes.length === 0 && (
					<span className="text-md absolute mt-10 flex w-full justify-center text-gray-400">
						No recipes left.
					</span>
				)}
				<DroppableRecipeList
					items={filteredRecipes}
					day="none"
					handleRemoveItem={handleRemoveItem}
				/>
			</div>
		</div>
	);
};

const SearchBar = ({
	searchTerm,
	setSearchTerm
}: {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<form onSubmit={e => e.preventDefault()}>
			<div className="flex">
				<input
					type="text"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder="Search for recipes..."
					className="md:text-md w-full rounded-full border border-gray-300 p-2 pr-10 text-sm"
				/>
				<button
					type="submit"
					className="-ml-10 items-center text-gray-400 hover:text-black"
				>
					<Search size={20} className="transition-colors duration-200" />
				</button>
			</div>
		</form>
	);
};
