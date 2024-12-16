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
	{ name: 'Find', icon: <Search size={20} />, path: '/filter' },
	{ name: 'Add Recipe', icon: <PlusCircle size={20} />, path: '/add-recipe' }
];
