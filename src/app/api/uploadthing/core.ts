import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

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
		.onUploadError(({ error, fileKey }) => {
			console.log(
				`While uploading ${fileKey} an error occurred: ${error.message}`
			);
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload

			console.log('file url', file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return {
				file_key: file.key,
				file_url: file.url
			};
		})
} satisfies FileRouter;

export type ImageFileRouter = typeof imageFileRouter;
