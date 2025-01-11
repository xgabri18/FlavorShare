'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Session } from 'next-auth';
import { Menu } from 'lucide-react';

import MenuOption from '@/components/ui/menuOption';
import { navigationOptions } from '@/data/navigation';
import LogInOut from '@/components/auth/loginout';

type NavigationBarProps = {
	session: Session | null;
};

export const NavigationBar = ({ session }: NavigationBarProps) => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!isMenuOpen);

	return (
		<header className="sticky top-0 z-20 w-full bg-stone-400 p-4 md:h-10">
			<div className="flex h-full w-full items-center justify-between">
				<nav className="hidden w-full items-center justify-between gap-4 sm:flex sm:gap-6">
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
					<LogInOut session={session}/>
				</nav>
				<button
					className="ml-auto block text-black focus:outline-none sm:hidden"
					onClick={toggleMenu}
				>
					<Menu className="h-5 w-5"/>
				</button>
			</div>
			{isMenuOpen && (
				<nav className="mt-3 flex flex-col items-start gap-3 sm:hidden">
					{navigationOptions.map((item, i) => (
						<Link
							key={i}
							href={item.path}
							className="text-black hover:text-slate-600"
							onClick={() => setMenuOpen(false)}
						>
							<MenuOption className="flex text-sm">
								{item.icon}
								{item.name}
							</MenuOption>
						</Link>
					))}
					<LogInOut session={session}/>
				</nav>
			)}
		</header>
	);
};

export default NavigationBar;
