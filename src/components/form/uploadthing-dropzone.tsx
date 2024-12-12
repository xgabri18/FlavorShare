'use client';

import { UploadDropzone } from './uploadthing';

type UTDProps = {
	setImageUrl: (imageUrl: string | null) => void;
};

export const UploadThingDropzone = ({ setImageUrl }: UTDProps) => (
	<div className="w-1/3 p-5">
		<UploadDropzone
			endpoint={routeRegistry => routeRegistry.imageUploader}
			onUploadAborted={() => {
				alert('Upload Aborted');
			}}
			onClientUploadComplete={res => {
				console.log(`onClientUploadComplete`, res);
				if (res.length !== 1) {
					throw new Error('result length after image upload should be 1');
				}
				setImageUrl(res[0].url);
			}}
			onUploadBegin={() => {
				console.log('upload begin');
			}}
		/>
	</div>
);
