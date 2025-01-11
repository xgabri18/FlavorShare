import { Plus } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { Button } from '../ui/button';
import { RedXButton } from '../ui/red-x-button';

import { FormInput } from './form-input';

export const CheffSelect = () => {
	const { register } = useFormContext();
	const {
		fields: cheffs,
		append: addCheff,
		remove: removeCheff
	} = useFieldArray({ ...register('cheffs') });

	return (
		<div>
			<label htmlFor="cheffsDiv" className="mr-2 flex pb-1 text-xl">
				Cheffs
			</label>
			<div key="cheffsDiv">
				{cheffs.map((cheff, index) => (
					<div className="flex" key={cheff.id}>
						<div className="my-2 mr-2 flex">
							<FormInput
								className="flex h-10 w-full rounded-xl border-none bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground"
								label=""
								{...register(`cheffs.${index}.name`)}
								placeholder="Cheff"
							/>
						</div>
						<RedXButton
							className="m-2"
							onClick={() => removeCheff(index)}
							isLoading={false}
						/>
					</div>
				))}
			</div>
			<Button
				className="my-2 rounded-xl bg-stone-400 text-xl hover:bg-blue-700"
				type="button"
				variant="default"
				size="lg"
				onClick={() => addCheff({ name: '' })}
			>
				<Plus />
				Add Cheff
			</Button>
		</div>
	);
};
