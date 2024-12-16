import React, { type Dispatch, type SetStateAction } from 'react';

import { type Ingredient } from '@/db/schema/ingredient';
import { type Category } from '@/db/schema/category';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

export const FilterControls: React.FC<FilterControlsProps> = ({
	categories,
	ingredients,
	cookingTimeRange,
	selectedCategory,
	setSelectedCategory,
	selectedIngredient,
	setSelectedIngredient,
	selectedCookingTime,
	setSelectedCookingTime,
	selectedRating,
	setSelectedRating,
	resetFilters
}) => (
	<div className="fixed left-0 top-0 h-full w-64 bg-gray-100 p-4 shadow-md">
		<h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-700">
			Filters
		</h2>
		<div className="flex flex-col gap-4">
			<div>
				<label
					htmlFor="category-select"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Category
				</label>
				<select
					id="category-select"
					value={selectedCategory ?? ''}
					onChange={e =>
						setSelectedCategory(e.target.value ? Number(e.target.value) : null)
					}
					className="w-full rounded border-gray-300 p-2"
				>
					<option value="">All</option>
					{categories.map(category => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label
					htmlFor="ingredient-select"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Ingredient
				</label>
				<select
					id="ingredient-select"
					value={selectedIngredient ?? ''}
					onChange={e =>
						setSelectedIngredient(
							e.target.value ? Number(e.target.value) : null
						)
					}
					className="w-full rounded border-gray-300 p-2"
				>
					<option value="">All</option>
					{ingredients.map(ingredient => (
						<option key={ingredient.id} value={ingredient.id}>
							{ingredient.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label
					htmlFor="preparation-time"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Preparation Time
				</label>
				<div id="preparation-time" className="flex flex-col gap-2">
					<div>
						<label
							htmlFor="min-time"
							className="block text-sm font-medium text-gray-600"
						>
							Min
						</label>
						<Input
							id="min-time"
							type="number"
							value={selectedCookingTime[0]}
							onChange={e =>
								setSelectedCookingTime([
									Number(e.target.value),
									selectedCookingTime[1]
								])
							}
							className="w-full rounded border-gray-300 p-2"
							min={cookingTimeRange[0]}
						/>
					</div>
					<div>
						<label
							htmlFor="max-time"
							className="block text-sm font-medium text-gray-600"
						>
							Max
						</label>
						<Input
							id="max-time"
							type="number"
							value={selectedCookingTime[1]}
							onChange={e =>
								setSelectedCookingTime([
									selectedCookingTime[0],
									Number(e.target.value)
								])
							}
							className="w-full rounded border-gray-300 p-2"
							max={cookingTimeRange[1]}
						/>
					</div>
				</div>
			</div>

			<div>
				<label
					htmlFor="rating-range"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Rating
				</label>
				<div id="rating-range" className="flex flex-col gap-2">
					<div>
						<label
							htmlFor="min-rating"
							className="block text-sm font-medium text-gray-600"
						>
							Min
						</label>
						<Input
							id="min-rating"
							type="number"
							value={selectedRating[0]}
							onChange={e =>
								setSelectedRating([Number(e.target.value), selectedRating[1]])
							}
							className="w-full rounded border-gray-300 p-2"
							min={1}
							max={5}
						/>
					</div>
					<div>
						<label
							htmlFor="max-rating"
							className="block text-sm font-medium text-gray-600"
						>
							Max
						</label>
						<Input
							id="max-rating"
							type="number"
							value={selectedRating[1]}
							onChange={e =>
								setSelectedRating([selectedRating[0], Number(e.target.value)])
							}
							className="w-full rounded border-gray-300 p-2"
							min={1}
							max={5}
						/>
					</div>
				</div>
			</div>

			<div>
				<Button
					onClick={resetFilters}
					className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
				>
					Reset Filters
				</Button>
			</div>
		</div>
	</div>
);
