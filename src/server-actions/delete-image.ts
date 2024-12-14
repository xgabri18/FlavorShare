'use server';
import { utapi } from '@/server/uploadthing';

export const deleteImage = async (imageUrl: string) => {
	const imageKey = imageUrl.replace('https://utfs.io/f/', '');
	await utapi.deleteFiles([imageKey]);
	return;
};
