'use client';
import { useMutation } from '@tanstack/react-query';

import { CreateRecipe } from '@/server-actions/create-recipe';

export const useCreateRecipeMutation = () =>
	useMutation({
		mutationFn: CreateRecipe
	});
