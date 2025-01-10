import React from 'react';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { db } from '@/db';
import { restaurants } from '@/db/schema/restaurant';
import { users } from '@/db/schema/user';
const WEEKLY_MENU_EDITOR_LINK = '/menu-editor';

export type RestaurantProps = {
	params: Promise<{
		id: number;
	}>;
};

const Page = async ({ params }: RestaurantProps) => {
	const { id } = await params;
	const restaurant = (
		await db.select().from(restaurants).where(eq(restaurants.id, id))
	).at(0);

	if (!restaurant) {
		return notFound();
	}

	const allUsers = await db.select().from(users);

	const owner = allUsers.find(user => user.id === restaurant.user_id);
	const chefs = allUsers.filter(user => user.restaurant_id === restaurant.id);

	return (
		<div className="p-8 font-sans">
			<h1 className="mb-4 text-4xl font-bold">{restaurant.name}</h1>

			<p className="mb-2 text-lg">
				<strong>Owner:</strong> {owner?.name}
			</p>
			<p className="mb-4 text-lg">
				<strong>Location:</strong> {restaurant.location}
			</p>

			<div className="mb-6">
				<Link
					href={WEEKLY_MENU_EDITOR_LINK}
					className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					Edit Weekly Menu
				</Link>
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
	);
};

export default Page;
