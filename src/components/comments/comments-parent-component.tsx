'use server';

import { fetchCommentsWithUser } from './actions';
import { CommentSection } from './comments-section';
import { type CurrentUser } from './types';

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
