import { type Session } from 'next-auth';

import { LoginButton } from '@/components/auth/loginButton';
import { LogoutButton } from '@/components/auth/logoutButton';

type LogInOutProps = {
	session: Session | null;
};

const LogInOut = ({ session }: LogInOutProps) => (
	<div className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:gap-4 sm:text-base">
		{session?.user ? (
			<>
				<span className="whitespace-nowrap text-center sm:text-left">
					{session?.user?.name}
				</span>

				<div className="w-full text-center sm:w-auto sm:text-left">
					<LogoutButton />
				</div>
			</>
		) : (
			<LoginButton />
		)}
	</div>
);

export default LogInOut;
