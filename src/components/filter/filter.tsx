'use client';

import React, { useState, useEffect } from 'react';

import { type Recipe } from '@/db/schema/recipe';
import { type Category } from '@/db/schema/category';
import { type Ingredient } from '@/db/schema/ingredient';
import { type UsedIngredient } from '@/db/schema/usedIngredient';
import { type RecipeCategory } from '@/db/schema/recipeCategory';
import { FilterControls } from '@/components/filter/filter-controls';
import { RecipeList } from '@/components/filter/recipe-list';

type FilterProps = {
	categories: Category[];
	recipes: Recipe[];
	cookingTime: number[];
	ingredient: Ingredient[];
	recipesIngredients: UsedIngredient[];
	recipeCategory: RecipeCategory[];
};

export const Filter = ({
	categories,
	recipes,
	cookingTime,
	ingredient,
	recipesIngredients,
	recipeCategory
}: FilterProps) => {
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
	const [selectedIngredient, setSelectedIngredient] = useState<number | null>(
		null
	);
	const [selectedCookingTime, setSelectedCookingTime] = useState<number[]>([
		cookingTime[0],
		cookingTime[1]
	]);
	const [selectedRating, setSelectedRating] = useState<number[]>([0, 5]);

	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

	useEffect(() => {
		let filtered = recipes;

		if (selectedCategory !== null) {
			const categoryRecipeIds = recipeCategory
				.filter(rc => rc.category_id === selectedCategory)
				.map(rc => rc.recipe_id);
			filtered = filtered.filter(recipe =>
				categoryRecipeIds.includes(recipe.id)
			);
		}

		if (selectedIngredient !== null) {
			const ingredientRecipeIds = recipesIngredients
				.filter(ri => ri.ingredient_id === selectedIngredient)
				.map(ri => ri.recipe_id);
			filtered = filtered.filter(recipe =>
				ingredientRecipeIds.includes(recipe.id)
			);
		}

		filtered = filtered.filter(
			recipe =>
				recipe.preparation_time >= selectedCookingTime[0] &&
				recipe.preparation_time <= selectedCookingTime[1]
		);

		filtered = filtered.filter(recipe => {
			const rating = recipe.rating ?? 0;
			return rating >= selectedRating[0] && rating <= selectedRating[1];
		});

		setFilteredRecipes(filtered);
	}, [
		selectedCategory,
		selectedIngredient,
		selectedCookingTime,
		selectedRating,
		recipes,
		recipeCategory,
		recipesIngredients
	]);

	const resetFilters = () => {
		setSelectedCategory(null);
		setSelectedIngredient(null);
		setSelectedCookingTime([cookingTime[0], cookingTime[1]]);
		setSelectedRating([0, 5]);
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<div className="fixed h-full bg-gray-100 p-4">
				<FilterControls
					categories={categories}
					ingredients={ingredient}
					cookingTimeRange={cookingTime}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					selectedIngredient={selectedIngredient}
					setSelectedIngredient={setSelectedIngredient}
					selectedCookingTime={selectedCookingTime}
					setSelectedCookingTime={setSelectedCookingTime}
					selectedRating={selectedRating}
					setSelectedRating={setSelectedRating}
					resetFilters={resetFilters}
				/>
			</div>
			<div className="ml-80 w-3/4 overflow-y-auto p-4">
				<RecipeList recipes={filteredRecipes} />
			</div>
		</div>
	);
};
