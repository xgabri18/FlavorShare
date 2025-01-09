import Link from 'next/link';
type restaurantProps = {
	restaurantId: number;
	restaurantName: string;
	restaurantLocation: string;
};

export const RestaurantTile = ({
	restaurantId,
	restaurantName,
	restaurantLocation
}: restaurantProps) => (
	<Link
		href={`/restaurant/${restaurantId}`}
		className="max-w-sm rounded-lg border border-gray-300 bg-gray-100 p-4 text-center shadow-md"
	>
		<h2 className="mb-2 text-xl font-semibold text-gray-800">
			{restaurantName}
		</h2>
		<p className="text-gray-600">{restaurantLocation}</p>
	</Link>
);
