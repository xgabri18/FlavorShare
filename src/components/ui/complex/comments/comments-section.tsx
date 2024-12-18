'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { CurrentUser, JoinedUserComment } from './types';
import { UserImageBubble } from './user-image-bubble';
import { CommentArea } from './comment-area';
import { AddCommentArea } from './add-comment-area';

type CommentsProps = {
	comments: JoinedUserComment[];
	currentUser: CurrentUser;
	recipeId: number;
};

export const CommentSection = ({
	comments,
	currentUser,
	recipeId
}: CommentsProps) => {
	const [commentList, setCommentList] = useState<JoinedUserComment[]>(comments);

	return (
		<div>
			<span className="mr-2 flex justify-end">
				{commentList.length} comments
			</span>
			<div className="space-y-4 border-t-2 border-t-gray-300 pt-2">
				{commentList.map(comment => (
					<div
						key={comment.id}
						className="flex items-start space-x-1 md:space-x-4"
					>
						<UserImageBubble url={comment.userImage} />
						<CommentArea
							commentData={comment}
							currentUserId={currentUser?.id}
							setCommentList={setCommentList}
						/>
					</div>
				))}
				{currentUser !== null && (
					<AddCommentArea
						currentUserId={currentUser.id}
						recipeId={recipeId}
						setCommentList={setCommentList}
					/>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
