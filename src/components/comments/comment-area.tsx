'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';

import { deleteComment, editComment } from './actions';
import { type JoinedUserComment } from './types';

export const CommentArea = ({
	currentUserId,
	commentData,
	setCommentList
}: {
	currentUserId: string | undefined;
	commentData: JoinedUserComment;
	setCommentList: Dispatch<SetStateAction<JoinedUserComment[]>>;
}) => {
	const [editContent, setEditContent] = useState<{ [key: number]: string }>({});

	const handleEdit = async (commentId: number) => {
		if (editContent[commentId] !== undefined) {
			const updatedComment = {
				id: commentId,
				content: editContent[commentId],
				date: new Date().toISOString()
			};

			await editComment(updatedComment);

			setCommentList(prev =>
				prev.map(comment =>
					comment.id === commentId
						? {
								...comment,
								content: editContent[commentId]
							}
						: comment
				)
			);
			setEditContent(prev => {
				const { [commentId]: _, ...rest } = prev;
				return rest;
			});
		}
	};

	const handleRemoveComment = async (commentId: number) => {
		await deleteComment(commentId);

		setCommentList(prev => prev.filter(comment => comment.id !== commentId));
	};

	return (
		<div className="flex-1 rounded-lg bg-gray-100 p-4">
			<div className="flex justify-between">
				<div className="flex flex-col md:flex-row md:gap-2">
					<h4 className="font-semibold">{commentData.userName}</h4>
					<span className="content-center text-sm text-gray-400">
						{timeAgo(commentData.date)}
					</span>
				</div>
				{currentUserId === commentData.user_id && (
					<div className="flex space-x-2">
						<button
							onClick={() => {
								if (editContent[commentData.id] !== undefined) {
									handleEdit(commentData.id);
								} else {
									setEditContent({
										...editContent,
										[commentData.id]: commentData.content
									});
								}
							}}
							className="transform rounded-xl px-2 text-blue-700 transition duration-300 hover:bg-blue-700 hover:text-white"
						>
							{editContent[commentData.id] !== undefined ? 'Save' : 'Edit'}
						</button>
						<button
							onClick={() => handleRemoveComment(commentData.id)}
							className="text-red-500 hover:text-red-700"
						>
							Remove
						</button>
					</div>
				)}
			</div>
			{editContent[commentData.id] !== undefined ? (
				<textarea
					value={editContent[commentData.id]}
					onChange={e =>
						setEditContent({
							...editContent,
							[commentData.id]: e.target.value
						})
					}
					className="mt-2 w-full rounded border p-2"
				/>
			) : (
				<p className="mt-2">{commentData.content}</p>
			)}
		</div>
	);
};

// Chatgpt generated
const timeAgo = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const timeUnits: { unit: string; seconds: number }[] = [
		{ unit: 'year', seconds: 31536000 },
		{ unit: 'month', seconds: 2592000 },
		{ unit: 'day', seconds: 86400 },
		{ unit: 'hour', seconds: 3600 },
		{ unit: 'minute', seconds: 60 }
	];

	for (const { unit, seconds } of timeUnits) {
		const count = Math.floor(diffInSeconds / seconds);
		if (count >= 1) {
			return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
		}
	}

	return diffInSeconds < 60 ? 'just now' : `${diffInSeconds} seconds ago`;
};
