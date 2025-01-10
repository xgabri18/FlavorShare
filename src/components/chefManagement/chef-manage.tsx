'use client';
import React from 'react';
import Link from 'next/link';

import {
	leaveRestaurant,
	toggleChef
} from '@/components/chefManagement/actions';

type Props = {
	userId: string;
	chef: boolean;
	restaurantId: number | null;
};

const ChefManage = ({ userId, chef, restaurantId }: Props) => {
	const handleChefToggle = async () => {
		await toggleChef(userId, !chef);
	};

	const handleLeaveRestaurant = async () => {
		await leaveRestaurant(userId);
	};

	return (
		<div>
			<div>
				<label>
					<input type="checkbox" checked={chef} onChange={handleChefToggle} />
					Enable Chef Role
				</label>
			</div>

			{restaurantId && (
				<div>
					<Link
						href={`/restaurant/${restaurantId}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						View Restaurant
					</Link>
				</div>
			)}

			{restaurantId && (
				<div>
					<button onClick={handleLeaveRestaurant}>Leave Restaurant</button>
				</div>
			)}
		</div>
	);
};

export default ChefManage;
