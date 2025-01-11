import { Home, User, Search, PlusCircle } from 'lucide-react';
import { type ReactNode } from 'react';

export type navigation = {
	name: string;
	icon: ReactNode;
	path: string;
};

export const navigationOptions: navigation[] = [
	{ name: 'Home', icon: <Home size={20} />, path: '/' },
	{ name: 'User', icon: <User size={20} />, path: '/user' },
	{ name: 'Browse', icon: <Search size={20} />, path: '/browse' },
	{ name: 'Add Recipe', icon: <PlusCircle size={20} />, path: '/add-recipe' },
	{
		name: 'Add Restaurant',
		icon: <PlusCircle size={20} />,
		path: '/add-restaurant'
	}
];
