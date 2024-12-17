import { Plus, X } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { Button } from '../ui/button';

import { FormInput } from './form-input';
import { RedXButton } from '../ui/red-x-button';

export const CategorySelect = () => {
	const { register } = useFormContext();
	const {
		fields: categories,
		append: addCategory,
		remove: removeCategory
	} = useFieldArray({ ...register('categories') });

	return (
		<div>
			<label htmlFor="categoriesDiv" className="mr-2 flex pb-1 text-xl">
				Categories
			</label>
			<div key="categoriesDiv">
				{categories.map((category, index) => (
					<div className="flex" key={category.id}>
						<div className="my-2 mr-2 flex">
							<FormInput
								className='flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground border-none'
								label=""
								{...register(`categories.${index}.category`)}
								placeholder="Category"
							/>
						</div>
						<RedXButton className="m-2" onClick={() => removeCategory(index)} isLoading={false}/>
					</div>
				))}
			</div>
			<Button
				className="my-2 rounded-xl text-xl bg-stone-400 hover:bg-blue-700"
				type="button"
				variant="default"
				size="lg"
				onClick={() => addCategory({ category: '' })}
			>
				<Plus/>Add Category
			</Button>
		</div>
	);
};