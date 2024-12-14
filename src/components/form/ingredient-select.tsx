import { X } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { Button } from '../ui/button';

import { FormInput } from './form-input';

export const IngredientSelect = () => {
	const { register } = useFormContext();
	const {
		fields: ingredients,
		append: addIngredient,
		remove: removeIngredient
	} = useFieldArray({ name: 'ingredients' });

	return (
		<div>
			<label htmlFor="ingredientsDiv" className="mr-2 flex pb-1">
				Ingredients
			</label>
			<div key="ingredientsDiv">
				{ingredients.map((ingredient, index) => (
					<div className="flex" key={ingredient.id}>
						<div className="my-2 mr-2">
							<FormInput
								label=""
								{...register(`ingredients.${index}.name`)}
								placeholder="Ingredient"
							/>
						</div>

						<div className="m-2">
							<FormInput
								label=""
								type="number"
								{...register(`ingredients.${index}.amount`)}
								placeholder="Amount"
							/>
						</div>

						<div className="m-2">
							<FormInput
								label=""
								{...register(`ingredients.${index}.unit`)}
								placeholder="Unit"
							/>
						</div>

						<Button
							className="m-2"
							variant="outline"
							onClick={() => removeIngredient(index)}
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
				onClick={() => addIngredient({ name: '', amount: '', unit: '' })}
			>
				Add Ingredient
			</Button>
		</div>
	);
};
