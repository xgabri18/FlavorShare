import { GetInspiredSection } from '@/components/ui/complex/get-inspired-section';

const Page = () => (
	<div className="min-h-screen bg-gray-50 p-6 md:p-20">
		<div className="mb-12 text-center">
			<h1 className="mb-4 text-5xl font-bold text-gray-800">FlavorShare</h1>
			<h2 className="mx-auto mb-6 max-w-3xl text-2xl text-gray-600">
				Discover, share, and savor recipes that bring people together. Your
				kitchen, your creativity, our community.
			</h2>
		</div>
		<GetInspiredSection />
	</div>
);

export default Page;
