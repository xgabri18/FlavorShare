'use client';

import { Button } from '@/components/ui/button';
import { signInAction } from '@/components/auth/actions';

export const LoginButton = () => {
	const onClick = async () => {
		await signInAction();
	};

	return <Button onClick={onClick}>Login</Button>;
};
