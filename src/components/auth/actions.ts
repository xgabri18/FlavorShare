'use server';

import { signIn, signOut } from '@/auth';

export const signInAction = async () => {
	await signIn('github', { redirectTo: '/' });
};

export const signOutAction = async () => {
	await signOut({ redirectTo: '/' });
};
