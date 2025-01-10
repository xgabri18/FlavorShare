'use server';

import { db } from '@/db';
import { comments } from '@/db/schema/comment';
import { users } from '@/db/schema/user';
import { eq } from 'drizzle-orm';
import { JoinedUserComment, NewComment } from './types';

export const addComment = async (newComment: NewComment) => {
	try {
		await db.insert(comments).values(newComment).run();
	} catch (error) {
		console.error('Error adding a comment:', error);
		throw new Error('Failed to add a comment');
	}
};

export const fetchCommentsWithUser = async (
	recipeId: number
): Promise<JoinedUserComment[]> => {
	const commentList = await db
		.select({
			id: comments.id,
			recipe_id: comments.recipe_id,
			user_id: comments.user_id,
			content: comments.content,
			date: comments.date,
			userName: users.name,
			userImage: users.image
		})
		.from(comments)
		.leftJoin(users, eq(comments.user_id, users.id))
		.where(eq(comments.recipe_id, recipeId))
		.all();

	return commentList;
};

export type EditComment = {
	id: number;
	content: string;
};

export const editComment = async (comment: EditComment) => {
	try {
		await db
			.update(comments)
			.set({ content: comment.content })
			.where(eq(comments.id, comment.id))
			.run();
	} catch (error) {
		console.error('Error editing a comment:', error);
		throw new Error('Failed to edit a comment');
	}
};

export const deleteComment = async (commentId: number) => {
	await db.delete(comments).where(eq(comments.id, commentId)).run();
};
