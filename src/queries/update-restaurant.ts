'use client';

import { useMutation } from '@tanstack/react-query';

import { updateRestaurant } from '@/server-actions/update-restaurant';

export const useUpdateRestaurantMutation = () =>
	useMutation({
		mutationFn: updateRestaurant,
		onError: () => {}
	});
