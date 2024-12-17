'use client';

import { useMutation } from '@tanstack/react-query';

import { deleteImage } from '@/server-actions/delete-image';

export const useDeleteImageMutation = () =>
	useMutation({
		mutationFn: deleteImage
	});
