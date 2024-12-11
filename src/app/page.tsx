import { GetInspiredSection } from '@/components/ui/complex/get-inspired-section';

export default function Home() {
	return (
		<div className="p-20">
			<h2 className="mb-24 text-2xl">Recipes by You for You.</h2>
			<GetInspiredSection />
		</div>
	);
}
