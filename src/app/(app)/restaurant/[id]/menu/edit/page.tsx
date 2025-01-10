'use server';
import { auth } from '@/auth';
import BackButton from '@/components/back-button';
import MenuDndParent from '@/components/menu/menu-dnd-parent';
import { isUserRestaurantOwner } from '@/server-actions/user';
import { redirect } from 'next/navigation';

type MenuPageProps = {
	params: Promise<{
		id: string;
	}>;
};

const MenuEditPage = async ({ params }: MenuPageProps) => {
	const { id } = await params;
	const restaurantId = id;

	const session = await auth();
	if (!session?.user || !session.user.id) {
		redirect('/auth/signing');
	} else {
		const isUserOwner = await isUserRestaurantOwner(
			session.user.id,
			Number(restaurantId)
		);
		if (!isUserOwner) {
			redirect(`/restaurant/${restaurantId}/menu`);
		}
	}

	return (
		<div className="flex flex-1 flex-col pt-10 md:p-20">
			<div className="absolute left-2 top-14 text-xl md:left-5 md:top-20">
				<BackButton />
			</div>
			<div className="flex flex-col items-center justify-center">
				<h1 className="mt-10 text-3xl font-semibold md:mt-0">Menu editor</h1>
				<p className="mx-5 text-center text-gray-400 md:m-0">
					To add recipes to the menu, just drag and drop them from the right
					column to the left.
				</p>
			</div>
			<div className="mt-10 xl:px-40 2xl:px-60">
				<MenuDndParent restaurant_id={Number(restaurantId)} />
			</div>
		</div>
	);
};

export default MenuEditPage;
