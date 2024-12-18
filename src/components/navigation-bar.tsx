import Link from 'next/link';

import MenuOption from '@/components/ui/menuOption';
import { navigationOptions } from '@/data/navigation';
import LogInOut from '@/components/auth/loginout';

export const NavigationBar = () => (
	<header className="sticky top-0 z-20 mx-auto flex h-10 w-full items-center justify-start bg-stone-400 p-6">
		<nav className="flex h-full w-full items-center justify-evenly gap-4 sm:gap-2">
			{navigationOptions.map((item, i) => (
				<Link
					key={i}
					href={item.path}
					className="text-black hover:text-slate-600"
				>
					<MenuOption className="flex text-sm sm:text-base">
						{item.icon}
						{item.name}
					</MenuOption>
				</Link>
			))}
			<LogInOut />
		</nav>
	</header>
);

export default NavigationBar;
