import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

import { Providers } from '@/components/providers';
import { NavigationBar } from '@/components/navigation-bar';
import { auth } from '@/auth';

export const metadata: Metadata = {
	title: 'FlavorShare',
	description:
		'Application which connect all the people who share their love for the cooking and good food'
};

const RootLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const session = await auth();

	return (
		<html lang="en">
			<body>
				<Providers>
					{/* Pass the session to NavigationBar */}
					<NavigationBar session={session} />
					{children}
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
