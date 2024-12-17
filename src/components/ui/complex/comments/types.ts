export type JoinedUserComment = {
	id: number;
	recipe_id: number;
	user_id: string;
	content: string;
	date: string;
	userName: string | null;
	userImage: string | null;
};

export type CurrentUser = {
	id: string;
	name: string;
	image: string | null;
} | null;

export type NewComment = {
	recipe_id: number;
	user_id: string;
	content: string;
	date: string;
};
