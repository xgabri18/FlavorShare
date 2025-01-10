export type MenuRecipe = {
	recipe_id: number;
	recipe_name: string;
};

export type DayOfWeek =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'
	| 'none';

export type MenuRecipeDroppable = {
	day: DayOfWeek;
	recipe: MenuRecipe;
};
