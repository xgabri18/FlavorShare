'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { JoinedUserComment, NewComment } from './types';
import { addComment, fetchCommentsWithUser } from './actions';
import { Button } from '../../button';

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
				recipe_id: recipeId,
				user_id: currentUserId,
				content: newComment,
				date: new Date().toISOString()
			};

			await addComment(newCommentObj);

			const updatedComments = await fetchCommentsWithUser(recipeId);
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
			<Button
				variant="default"
				onClick={handleAddComment}
				className="text-white hover:bg-blue-400"
			>
				Add Comment
			</Button>
		</div>
	);
};
