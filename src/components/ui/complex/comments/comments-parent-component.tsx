'use server';

import CommentSection from './comments-section';
import { CurrentUser, JoinedUserComment } from './types';
import { fetchCommentsWithUser } from './actions';

export const CommentsParent = async ({
	recipeId,
	currentUser
}: {
	recipeId: number;
	currentUser: CurrentUser;
}) => {
	const relevantComments = await fetchCommentsWithUser(recipeId);
	return (
		<CommentSection
			currentUser={currentUser}
			comments={relevantComments}
			recipeId={recipeId}
		/>
	);
};
