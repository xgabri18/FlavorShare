'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import {
	leaveRestaurant,
	toggleChef
} from '@/components/chefManagement/actions';
import { Button } from '@/components/ui/button';

type Props = {
	userId: string;
	chef: boolean;
	restaurantId: number | null;
};

const ChefManage = ({ userId, chef, restaurantId }: Props) => {
	const [visibleChef, setVisibleChef] = useState(chef);
	const handleChefToggle = async () => {
		setVisibleChef(!visibleChef);
		await toggleChef(userId, !chef);
	};

	const handleLeaveRestaurant = async () => {
		await leaveRestaurant(userId);
	};

	return (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2">
				<label htmlFor="chef-toggle" className="text-sm font-medium">
					Enable Chef Role
				</label>
				<input
					id="chef-toggle"
					type="checkbox"
					checked={visibleChef}
					onChange={handleChefToggle}
					disabled={restaurantId !== null}
					className="h-4 w-4"
				/>
			</div>

			{restaurantId && (
				<Button asChild variant="default" size="sm">
					<Link
						href={`/restaurant/${restaurantId}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						View Restaurant
					</Link>
				</Button>
			)}

			{restaurantId && (
				<Button onClick={handleLeaveRestaurant} size="sm">
					Leave Restaurant
				</Button>
			)}
		</div>
	);
};

export default ChefManage;
