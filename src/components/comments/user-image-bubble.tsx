import Image from 'next/image';

export const UserImageBubble = ({ url }: { url: string | null }) => (
	<div className="relative h-10 w-10 rounded-full bg-gray-100">
		<Image
			src={url ?? '/image.svg'}
			alt="User icon"
			fill
			objectFit="fill"
			className="h-10 w-10 rounded-full"
		/>
	</div>
);
