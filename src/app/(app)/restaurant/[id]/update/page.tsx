import { notFound, redirect } from 'next/navigation';

import { auth } from '@/auth';
import RestaurantFormComponent from '@/components/form/restaurant-form';
import getRestaurantWithRelated from '@/server-actions/get-restaurant-with-related';
import { isUserRestaurantOwner } from '@/server-actions/user';

type RecipePageProps = {
	params: Promise<{
		id: string;
	}>;
};

const Page = async ({ params }: RecipePageProps) => {
	const { id } = await params; // This is apparently required from Next 15 https://stackoverflow.com/questions/79143162/route-locale-used-params-locale-params-should-be-awaited-before-using
	const session = await auth();
	if (!session?.user?.id) {
		redirect('/auth/signing');
	}
	const isUserOwner = await isUserRestaurantOwner(session.user.id, Number(id));
	if (!isUserOwner) {
		redirect(`/restaurant/${id}/menu`);
	}
	const restaurant = await getRestaurantWithRelated(
		Number(id),
		session.user.id
	);
	if (restaurant === null) {
		return notFound();
	}

	return (
		<main className="md:container md:w-4/5">
			<div className="flex">
				<RestaurantFormComponent
					userId={session.user.id ?? ''}
					restaurantId={restaurant.id}
					data={restaurant}
				/>
			</div>
		</main>
	);
};

export default Page;
