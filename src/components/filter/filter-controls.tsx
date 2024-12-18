import React, { useState, type Dispatch, type SetStateAction } from 'react';

import { type Ingredient } from '@/db/schema/ingredient';
import { type Category } from '@/db/schema/category';
import { FilterSection } from '@/components/filter/filter-section';

type FilterControlsProps = {
	categories: Category[];
	ingredients: Ingredient[];
	cookingTimeRange: number[];
	selectedCategory: number | null;
	setSelectedCategory: Dispatch<SetStateAction<number | null>>;
	selectedIngredient: number | null;
	setSelectedIngredient: Dispatch<SetStateAction<number | null>>;
	selectedCookingTime: number[];
	setSelectedCookingTime: Dispatch<SetStateAction<number[]>>;
	selectedRating: number[];
	setSelectedRating: Dispatch<SetStateAction<number[]>>;
	resetFilters: () => void;
};

export const FilterControls: React.FC<FilterControlsProps> = (
	props: FilterControlsProps
) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleFilters = () => setIsOpen(!isOpen);

	return (
		<div className="relative">
			<div className="mb-4 sm:hidden">
				<button
					className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					onClick={toggleFilters}
				>
					{isOpen ? 'Hide Filters' : 'Show Filters'}
				</button>
			</div>

			{isOpen && (
				<div className="relative left-0 top-0 z-20 mt-12 w-full bg-gray-100 p-4 shadow-md sm:hidden">
					<h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-700">
						Filters
					</h2>
					<div className="flex flex-col gap-4">
						<FilterSection {...props} />
					</div>
				</div>
			)}

			<div className="hidden w-64 bg-gray-100 p-4 shadow-md sm:block">
				<h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-700">
					Filters
				</h2>
				<div className="flex flex-col gap-4">
					<FilterSection {...props} />
				</div>
			</div>
		</div>
	);
};
