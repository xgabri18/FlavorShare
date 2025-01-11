import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import RestaurantFormComponent from '@/components/form/restaurant-form';

const Page = async () => {
	const session = await auth();
	if (!session?.user?.id) {
		redirect('/auth/signing');
	}

	return (
		<main className="md:container md:w-4/5">
			<div className="flex">
				<RestaurantFormComponent
					userId={session.user.id ?? ''}
					restaurantId={null}
					data={null}
				/>
			</div>
		</main>
	);
};

export default Page;
