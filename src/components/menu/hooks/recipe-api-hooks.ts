import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type MenuRecipe, type MenuRecipeDroppable } from '../types';

const fetchRecipes = async (userId: string): Promise<MenuRecipe[]> => {
	const response = await fetch(`/api/recipe/list?user_id=${userId}`);
	if (!response.ok) {
		throw new Error('Failed to fetch recipes');
	}
	return response.json();
};

export const useRecipesQuery = (userId: string) =>
	useQuery({
		queryKey: ['allRecipes'],
		queryFn: () => fetchRecipes(userId)
	});

const fetchMenuForRestaurant = async (
	id: string
): Promise<Record<string, MenuRecipe[]>> => {
	// const response = await fetch(`/api/restaurant/${id}/menu`);
	// if (!response.ok) {
	// 	throw new Error(`Failed to fetch menu for restaurant ${id}`);
	// }
	//return await response.json();
	const response = await fetch(`/api/restaurant/${id}/menu`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch menu for restaurant ${id}`);
	}
	return await response.json();
};

export const useMenuRestaurantQuery = (restaurant_id: number) =>
	useQuery({
		queryKey: ['restaurantMenu'],
		queryFn: async () => await fetchMenuForRestaurant(restaurant_id.toString())
	});

const transformMenu = (menu: MenuRecipeDroppable[]) => {
	const daysOfWeek = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday'
	];
	return {
		menu: daysOfWeek.map(day => {
			const recipesForDay = menu.filter(item => item.day.toLowerCase() === day);
			return {
				recipeIds: recipesForDay.map(item => item.recipe.recipe_id),
				day_of_week: day
			};
		})
	};
};

const updateMenu = async ({
	menu,
	id
}: {
	menu: MenuRecipeDroppable[];
	id: string;
}) => {
	const menuBody = transformMenu(menu.filter(item => item.day !== 'none'));
	const response = await fetch(`/api/restaurant/${id}/menu`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(menuBody)
	});
	if (!response.ok) {
		throw new Error('Failed to post menu');
	}
};

export const useUploadMenuMutation = () =>
	useMutation({
		mutationFn: updateMenu,
		onSuccess: async () => {
			console.log('Create Menu success.');
			toast.success('Menu updated');
			//await queryClient.invalidateQueries({ queryKey: ['restaurantMenu'] });
		},
		onError: () => {
			console.log('Create Menu error.');
			toast.error('Failed to update menu');
		}
	});
