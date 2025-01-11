import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GitHub from 'next-auth/providers/github';

import { db } from '@/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [GitHub]
});
