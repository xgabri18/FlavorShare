'use client';

import {
	closestCorners,
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
	useMenuRestaurantQuery,
	useRecipesQuery,
	useUploadMenuMutation
} from './hooks/recipe-api-hooks';
import { MenuBuilder } from './menu-builder';
import { RecipeListParent } from './recipe-list-parent';
import {
	type DayOfWeek,
	type MenuRecipe,
	type MenuRecipeDroppable
} from './types';

const MenuDndParent = ({
	restaurant_id,
	user_id
}: {
	restaurant_id: number;
	user_id: string;
}) => {
	const { data: recipes, isLoading } = useRecipesQuery(user_id);
	const { data: menu, isLoading: isMenuLoading } =
		useMenuRestaurantQuery(restaurant_id);
	const [allRecipes, setAllRecipes] = useState<MenuRecipeDroppable[]>([]);
	useEffect(() => {
		if (recipes && menu) {
			setAllRecipes(convertMenuRecipe(recipes, menu));
		}
	}, [recipes, menu]);

	const { mutate: uploadMenu, isPending } = useUploadMenuMutation();

	// this means that we need to move the draggable element at least 3 pixels before it registers as dragging
	// that is useful because i want to add a delete button onto the draggable card
	// without this the delete wouldnt be able to be clicked
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
		useSensor(TouchSensor, { activationConstraint: { distance: 3 } })
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return; // Dropping on the same spot it was picked up from
		console.log(`DragEnd: ${over.id}`);
		if (over.data.current?.type === 'droppable') return;
		setAllRecipes(droppableRecipes => {
			const oldIndex = droppableRecipes.findIndex(
				droppableRecipe => droppableRecipe.recipe.recipe_id === active.id
			);

			const newIndex = droppableRecipes.findIndex(
				droppableRecipe => droppableRecipe.recipe.recipe_id === over.id
			);

			return arrayMove(droppableRecipes, oldIndex, newIndex);
		});
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return; // Dropping on the same spot it was picked up from
		console.log(`Dragging over: ${over.id}`);
		if (over.data.current?.type === 'droppable') {
			// the over item is a droppable box (e.g: empty Monday menu)
			console.log(`Inside ${over.id}`);
			const activeIndex = allRecipes.findIndex(
				recipe => recipe.recipe.recipe_id === active.id
			);
			if (activeIndex !== -1) {
				setAllRecipes(recipes => {
					const dayOfWeek = over.id.toString().toLowerCase() as DayOfWeek;
					recipes[activeIndex].day = dayOfWeek;

					return arrayMove(recipes, activeIndex, activeIndex); // rerender
				});
			}
		} else {
			// The over item is a recipe
			console.log(`Dragging over recipe: ${over.id}`);
			const activeIndex = allRecipes.findIndex(
				recipe => recipe.recipe.recipe_id === active.id
			);
			const overIndex = allRecipes.findIndex(
				recipe => recipe.recipe.recipe_id === over.id
			);
			if (activeIndex !== -1) {
				setAllRecipes(recipes => {
					recipes[activeIndex].day = recipes[overIndex].day;

					return arrayMove(recipes, activeIndex, activeIndex); // rerender
				});
			}
		}
	};

	const handleRemove = (recipeId: number) => {
		setAllRecipes(recipes => {
			const index = recipes.findIndex(
				recipe => recipe.recipe.recipe_id === recipeId
			);
			recipes[index].day = 'none';
			return arrayMove(recipes, index, index); // rerender
		});
	};

	const handleUploadMenu = async () => {
		uploadMenu({ menu: allRecipes, id: restaurant_id.toString() });
	};

	return (
		<div>
			<DndContext
				collisionDetection={closestCorners}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
				sensors={sensors}
			>
				<div className="flex justify-between">
					{isLoading || isMenuLoading ? (
						<div className="flex w-full justify-center gap-2">
							<span className="text-xl">Loading </span>
							<Loader className="animate-spin text-sm" />
						</div>
					) : (
						<div className="flex w-full">
							<MenuBuilder
								className="w-1/2 md:mr-5"
								recipes={allRecipes.filter(recipe => recipe.day !== 'none')}
								handleRemoveItem={handleRemove}
								isSubmitPending={isPending}
								submitFn={handleUploadMenu}
							/>
							<RecipeListParent
								className="w-1/2"
								searchRecipes={allRecipes.filter(
									recipe => recipe.day === 'none'
								)}
								handleRemoveItem={handleRemove}
							/>
						</div>
					)}
				</div>
			</DndContext>
		</div>
	);
};

export default MenuDndParent;

const convertMenuRecipe = (
	recipes: MenuRecipe[],
	menu: Record<string, MenuRecipe[]>
) => {
	const rec = recipes.map<MenuRecipeDroppable>(recipe => ({
		day: 'none',
		recipe
	}));

	Object.keys(menu).forEach(day => {
		menu[day].forEach(recipe => {
			const index = rec.findIndex(r => r.recipe.recipe_id === recipe.recipe_id);
			rec[index].day = day.toLowerCase() as DayOfWeek;
		});
	});

	const noneDayRecipes = rec.filter(r => r.day === 'none');
	const orderedRecipes: MenuRecipeDroppable[] = [];
	Object.keys(menu).forEach(day => {
		menu[day].forEach(recipe => {
			const index = rec.findIndex(r => r.recipe.recipe_id === recipe.recipe_id);
			if (index !== -1) {
				orderedRecipes.push(rec[index]);
			}
		});
	});
	return [...orderedRecipes, ...noneDayRecipes];
};
