import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ntdoas63ys.ufs.sh',
				port: '',
				pathname: '/f/**',
				search: ''
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'ntdoas63ys.ufs.sh',
				port: '',
				pathname: '/f/**',
				search: ''
			}
		]
	}
};

export default nextConfig;
