'use client';

import { useMutation } from '@tanstack/react-query';

import { addRestaurant } from '@/server-actions/add-restaurant';

export const useCreateRestaurantMutation = () =>
	useMutation({
		mutationFn: addRestaurant
	});
