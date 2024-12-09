import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

import { Providers } from '@/components/providers';
import NavigationBar from '@/components/navigation-bar';

export const metadata: Metadata = {
	title: 'FlavorShare',
	description:
		'Application which connect all the people who share their love for the cooking and good food'
};

export default ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body>
			<Providers>
				<NavigationBar />
				{children}
			</Providers>
		</body>
	</html>
);
