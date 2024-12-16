import { Plus, X } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { Button } from '../ui/button';

import { FormInput } from './form-input';
import { RedXButton } from '../ui/red-x-button';

export const IngredientSelect = () => {
	const { register } = useFormContext();
	const {
		fields: ingredients,
		append: addIngredient,
		remove: removeIngredient
	} = useFieldArray({ name: 'ingredients' });

	return (
		<div>
			<label htmlFor="ingredientsDiv" className="mr-2 flex pb-1 text-xl">
				Ingredients
			</label>
			<div key="ingredientsDiv">
				{ingredients.map((ingredient, index) => (
					<div className="flex" key={ingredient.id}>
						<div className="my-2 mr-2">
							<FormInput
								className='flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground border-none'
								label=""
								{...register(`ingredients.${index}.name`)}
								placeholder="Ingredient"
							/>
						</div>

						<div className="m-2">
							<FormInput
								className='flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground border-none'
								label=""
								type="number"
								{...register(`ingredients.${index}.amount`)}
								placeholder="Amount"
							/>
						</div>

						<div className="m-2">
							<FormInput
								className='flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground border-none'
								label=""
								{...register(`ingredients.${index}.unit`)}
								placeholder="Unit"
							/>
						</div>
						<RedXButton className='m-2' onClick={() => removeIngredient(index)} isLoading={false}/>
					</div>
				))}
			</div>
			<Button
				className="my-2 rounded-xl text-xl bg-stone-400 hover:bg-blue-700"
				type="button"
				variant="default"
				size="lg"
				onClick={() => addIngredient({ name: '', amount: '', unit: '' })}
			>
				<Plus/>Add Ingredient
			</Button>
		</div>
	);
};
