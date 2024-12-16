import { useFormContext } from 'react-hook-form';

export const VisibilitySelect = () => {
	const { register } = useFormContext();
	const visibilityOptions = ['private', 'public'];

	return (
		<label className="my-2">
			<div className="py-1">Visibility</div>
			<select
				className="flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground border-none"
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
