import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { auth } from '@/auth';
import { DeleteRestaurantButton } from '@/components/delete-restaurant-button';
import { db } from '@/db';
import { restaurants } from '@/db/schema/restaurant';
import { users } from '@/db/schema/user';

export type RestaurantProps = {
	params: Promise<{
		id: number;
	}>;
};

const Page = async ({ params }: RestaurantProps) => {
	const { id } = await params;
	const session = await auth();
	const restaurant = (
		await db.select().from(restaurants).where(eq(restaurants.id, id))
	).at(0);

	if (!restaurant) {
		return notFound();
	}

	const allUsers = await db.select().from(users);

	const owner = allUsers.find(user => user.id === restaurant.user_id);
	const chefs = allUsers.filter(user => user.restaurant_id === restaurant.id);

	if (!session?.user?.id) {
		redirect('/auth/signing');
	} else {
		const isOwner = session.user.id === owner?.id;
		const isChef = chefs.some(chef => chef.id === session?.user?.id);

		if (!isOwner && !isChef) {
			redirect('/');
		}
	}
	const isOwner = session.user.id === owner?.id;

	return (
		<div className="flex justify-center">
			<div className="mt-10 rounded-lg border border-black bg-white shadow-md">
				<div className="flex justify-center pt-8 font-sans">
					<h1 className="mb-4 text-4xl font-bold">{restaurant.name}</h1>
				</div>
				{session.user.id === owner?.id && (
					<div className="m-3 flex justify-center">
						<Link
							className="mx-5 rounded bg-green-500 px-4 py-2 text-white hover:bg-blue-600"
							href={`/restaurant/${id}/update`}
						>
							Update
						</Link>
						<DeleteRestaurantButton restaurantId={id} />
					</div>
				)}
				<div className="flex-column p-8 font-sans">
					<p className="mb-2 text-lg">
						<strong>Owner:</strong> {owner?.name}
					</p>
					<p className="mb-4 text-lg">
						<strong>Location:</strong> {restaurant.location}
					</p>

					<div className="mb-6 flex w-1/2 flex-col space-y-4 md:w-full md:flex-none md:flex-row md:space-x-4 md:space-y-0">
						<Link
							href={`/restaurant/${id}/menu`}
							className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-400"
						>
							View Weekly Menu
						</Link>
						{isOwner && (
							<Link
								href={`/restaurant/${id}/menu/edit`}
								className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-400"
							>
								Edit Weekly Menu
							</Link>
						)}
					</div>

					<div>
						<h2 className="mb-4 text-2xl font-semibold">
							Chefs Working in the Restaurant
						</h2>
						<ul className="list-inside list-disc">
							{chefs.length === 0
								? 'No chefs in restaurant'
								: chefs.map(chef => (
										<li key={chef.id} className="text-lg">
											{chef.name}
										</li>
									))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
