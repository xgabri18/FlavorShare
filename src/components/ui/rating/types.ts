export type NewRating = {
	recipe_id: number;
	user_id: string;
	rating: number;
};

export type EditRating = {
	id: number;
	rating: number;
};

export type Rating = {
	id: number;
	recipe_id: number;
	user_id: string;
	rating: number;
};
