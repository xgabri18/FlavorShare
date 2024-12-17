'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { JoinedUserComment, NewComment } from './types';
import { addComment, fetchCommentsWithUser } from './actions';

export const AddCommentArea = ({
	currentUserId,
	recipeId,
	setCommentList
}: {
	currentUserId: string;
	recipeId: number;
	setCommentList: Dispatch<SetStateAction<JoinedUserComment[]>>;
}) => {
	const [newComment, setNewComment] = useState<string>('');

	const handleAddComment = async () => {
		if (newComment.trim() !== '') {
			const newCommentObj: NewComment = {
				recipe_id: recipeId, // Replace with the actual recipe ID
				user_id: currentUserId,
				content: newComment,
				date: new Date().toISOString()
			};

			await addComment(newCommentObj);

			// Assuming the ID is auto-generated and you fetch the updated comments
			const updatedComments = await fetchCommentsWithUser(recipeId); // Replace with actual recipe ID
			setCommentList(updatedComments);
			setNewComment('');
		}
	};

	return (
		<div className="mt-4">
			<textarea
				value={newComment}
				onChange={e => setNewComment(e.target.value)}
				placeholder="Add a comment..."
				className="w-full rounded border p-2"
			/>
			<button
				onClick={handleAddComment}
				className="mt-2 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-400"
			>
				Add Comment
			</button>
		</div>
	);
};
