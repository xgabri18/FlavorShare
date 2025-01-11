import { useMutation } from '@tanstack/react-query';

import updateRecipe from '@/server-actions/update-recipe';

export const useUpdateRecipeMutation = () =>
	useMutation({
		mutationFn: updateRecipe
	});
