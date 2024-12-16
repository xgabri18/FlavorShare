'use server';

import { revalidatePath } from 'next/cache';

import { signIn, signOut } from '@/auth';

export const signInAction = async () => {
	await signIn('github');
};

export const signOutAction = async () => {
	await signOut({ redirect: false });
};
