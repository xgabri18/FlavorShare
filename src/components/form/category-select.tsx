import { X } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { Button } from '../ui/button';

import { FormInput } from './form-input';

export const CategorySelect = () => {
	const { register } = useFormContext();
	const {
		fields: categories,
		append: addCategory,
		remove: removeCategory
	} = useFieldArray({ ...register('categories') });

	return (
		<div>
			<label htmlFor="categoriesDiv" className="mr-2 flex pb-1">
				Categories
			</label>
			<div key="categoriesDiv">
				{categories.map((category, index) => (
					<div className="flex" key={category.id}>
						<div className="my-2 mr-2 flex">
							<FormInput
								label=""
								{...register(`categories.${index}.category`)}
								placeholder="Category"
							/>
						</div>
						<Button
							className="m-2"
							variant="outline"
							onClick={() => removeCategory(index)}
						>
							<X />
						</Button>
					</div>
				))}
			</div>
			<Button
				className="my-2"
				type="button"
				variant="outline"
				size="lg"
				onClick={() => addCategory({ category: '' })}
			>
				Add Category
			</Button>
		</div>
	);
};
