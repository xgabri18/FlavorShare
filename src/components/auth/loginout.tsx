import { LoginButton } from '@/components/auth/loginButton';
import { LogoutButton } from '@/components/auth/logoutButton';
import { auth } from '@/auth';

const LogInOut = async () => {
	const session = await auth();

	return (
		<div className="flex items-center gap-2 text-sm sm:text-base">
			{session?.user ? (
				<>
					<span className="hidden sm:inline">{session?.user?.name} |</span>
					<LogoutButton />
				</>
			) : (
				<LoginButton />
			)}
		</div>
	);
};

export default LogInOut;
