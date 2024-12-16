'use client';

import { toast } from 'sonner';

import { UploadDropzone } from './uploadthing';

type UTDProps = {
	setImageUrl: (imageUrl: string | null) => void;
};

export const UploadThingDropzone = ({ setImageUrl }: UTDProps) => (
	<div className="w-full p-5">
		<UploadDropzone
			className="h-80"
			endpoint={routeRegistry => routeRegistry.imageUploader}
			onUploadAborted={() => {
				toast.error('Upload Aborted');
			}}
			onClientUploadComplete={res => {
				console.log(`onClientUploadComplete`, res);
				if (res.length !== 1) {
					throw new Error('result length after image upload should be 1');
				}
				setImageUrl(res[0].url);
				toast.success('Image uploaded.');
			}}
			onUploadBegin={() => {
				console.log('upload begin');
			}}
		/>
	</div>
);
