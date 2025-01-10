'use server';
import BackButton from '@/components/back-button';
import {
	getMenuForRestaurantAction,
	getRestaurantNameAction
} from '@/components/menu/actions';
import { StaticMenuList } from '@/components/menu/static-menu-list';

type MenuPageProps = {
	params: Promise<{
		id: string;
	}>;
};

const MenuPage = async ({ params }: MenuPageProps) => {
	const { id } = await params;
	const restaurantId = id;
	const menu = await getMenuForRestaurantAction(Number(restaurantId));
	const restaurantMenu = await getRestaurantNameAction(Number(restaurantId));

	return (
		<div className="mt-10 flex flex-col items-center rounded-lg ring-black md:mx-60 md:py-10 md:shadow-lg md:ring-1 xl:mx-[512px]">
			<div className="absolute left-2 top-14 text-xl md:left-5 md:top-20">
				<BackButton />
			</div>

			<div className="flex flex-col items-center justify-center">
				<h1 className="text-3xl font-semibold">Menu for {restaurantMenu}</h1>
			</div>
			<div className="mt-10 px-14 text-center">
				<StaticMenuList menu={menu} />
			</div>
		</div>
	);
};

export default MenuPage;
