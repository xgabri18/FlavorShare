'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { signOutAction } from '@/components/auth/actions';

export const LogoutButton = () => {
	const router = useRouter();
	const onClick = async () => {
		await signOutAction();
		router.push('/');
	};

	return <Button onClick={onClick}>Logout</Button>;
};
