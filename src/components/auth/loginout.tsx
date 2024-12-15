'use client';

import { useSession } from 'next-auth/react';

import { LoginButton } from '@/components/auth/loginButton';
import { LogoutButton } from '@/components/auth/logoutButton';

const LogInOut = () => {
	const { data: session, status } = useSession();

	return (
		<div>
			{status === 'authenticated' ? (
				<>
					{session?.user?.name} | <LogoutButton />
				</>
			) : (
				<LoginButton />
			)}
		</div>
	);
};

export default LogInOut;
