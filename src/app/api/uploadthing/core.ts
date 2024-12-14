import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const imageFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f(
		{
			image: {
				/**
				 * For full list of options and defaults, see the File Route API reference
				 * @see https://docs.uploadthing.com/file-routes#route-config
				 */
				maxFileSize: '4MB',
				maxFileCount: 1
			}
		},
		{ awaitServerData: true }
	)
		// Set permissions and file types for this FileRoute
		.middleware(async () => {
			// async ({ req }) => {
			// This code runs on your server before upload
			const user = { id: 'fakeId' };

			// If you throw, the user will not be able to upload
			if (!user) throw new UploadThingError('Unauthorized');

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id };
		})
		.onUploadError(({ error, fileKey }) => {
			console.log(
				`While uploading ${fileKey} an error occurred: ${error.message}`
			);
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.userId);

			console.log('file url', file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return {
				uploadedBy: metadata.userId,
				file_key: file.key,
				file_url: file.url
			};
		})
} satisfies FileRouter;

export type ImageFileRouter = typeof imageFileRouter;
