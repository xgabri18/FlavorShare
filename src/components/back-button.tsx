'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
	const router = useRouter();
	const onClick = () => {
		router.push('/');
	};
	return (
		<Button
			onClick={onClick}
			className="mb-4 w-24 rounded-xl bg-stone-400 text-xl hover:bg-blue-600"
		>
			<ArrowLeft />
			back
		</Button>
	);
};
export default BackButton;
