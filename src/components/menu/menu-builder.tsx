import { cn } from '@/lib/cn';

import { Button } from '../ui/button';

import { DailyMenu } from './daily-menu';
import { type MenuRecipeDroppable } from './types';

const daysOfWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];

export const MenuBuilder = ({
	className,
	recipes,
	handleRemoveItem,
	isSubmitPending,
	submitFn
}: {
	className?: string;
	recipes: MenuRecipeDroppable[];
	handleRemoveItem: (recipeId: number) => void;
	isSubmitPending: boolean;
	submitFn: () => void;
}) => (
	<div
		className={cn(
			className,
			'flex flex-col gap-2 border border-gray-300 p-4 md:rounded-lg'
		)}
	>
		<Button
			type="button"
			variant="default"
			className="mb-2 self-center md:w-1/3"
			disabled={isSubmitPending}
			onClick={submitFn}
		>
			{isSubmitPending ? 'Submitting...' : 'Submit menu'}
		</Button>
		{daysOfWeek.map(day => {
			const filteredRecipes = recipes.filter(
				recipe => recipe.day.toLowerCase() === day.toLowerCase()
			);
			return (
				<DailyMenu
					key={day}
					recipes={filteredRecipes}
					title={day}
					handleRemoveItem={handleRemoveItem}
				/>
			);
		})}
	</div>
);
