import MenuOption from '@/components/ui/menuOption';
import { navigationOptions } from '@/data/navigation';

export const navigationBar = () => (
	<header className="sticky top-0 z-20 mx-auto flex h-10 w-full items-center justify-start bg-slate-200 px-4 py-2">
		<nav className="flex h-full w-full items-center justify-evenly">
			{navigationOptions.map((item, i) => (
				<a
					key={i}
					href={item.path}
					className="text-slate-800 hover:text-slate-600"
				>
					<MenuOption className="flex">
						{item.icon}
						{item.name}
					</MenuOption>
				</a>
			))}
		</nav>
	</header>
);
export default navigationBar;
