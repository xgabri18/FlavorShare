import { useFormContext } from 'react-hook-form';

export const VisibilitySelect = () => {
	const { register } = useFormContext();
	const visibilityOptions = ['private', 'public'];

	return (
		<label className="my-2">
			<div className="py-1">Visibility</div>
			<select
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				{...register('visibility')}
			>
				{visibilityOptions.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
};
