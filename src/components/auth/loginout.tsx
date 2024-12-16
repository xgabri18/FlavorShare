'use server';

import { LoginButton } from '@/components/auth/loginButton';
import { LogoutButton } from '@/components/auth/logoutButton';
import { auth } from '@/auth';

const LogInOut = async () => {
	const session = await auth();

	return (
		<div>
			{session?.user ? (
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
