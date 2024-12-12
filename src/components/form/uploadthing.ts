import {
	generateReactHelpers,
	// generateUploadButton,
	generateUploadDropzone
} from '@uploadthing/react';

import { type ImageFileRouter } from '@/app/api/uploadthing/core';

//   export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<ImageFileRouter>();
export const { useUploadThing } = generateReactHelpers<ImageFileRouter>();
