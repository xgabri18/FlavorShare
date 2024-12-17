'use client';

import { Button } from '@/components/ui/button';
import { signInAction } from '@/components/auth/actions';

const Page = () => {
	const onClick = async () => {
		await signInAction();
	};

	return <Button onClick={onClick}>Sign in with Github</Button>;
};

export default Page;
