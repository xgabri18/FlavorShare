'use client';

import { X } from 'lucide-react';
import React, { useState } from 'react';
import {
	useForm,
	useFieldArray,
	FormProvider,
	useFormContext
} from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useCreateRecipeMutation } from '@/queries/create-recipe';

import { Button } from '../ui/button';

import { FormInput } from './form-input';
import { type RecipeForm, recipeFormSchema } from './recipe-form-schema';
import { UploadThingDropzone } from './uploadthing-dropzone';

const VisibilitySelect = () => {
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

const CategorySelect = () => {
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

const IngredientSelect = () => {
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

const DynamicForm = () => {
	const form = useForm<RecipeForm>({
		resolver: zodResolver(recipeFormSchema),
		defaultValues: {
			name: '',
			description: '',
			preparation_time: undefined,
			visibility: 'public',
			categories: [],
			ingredients: []
		}
	});
	const router = useRouter();
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const mutation = useCreateRecipeMutation();
	const onSubmit = async (data: RecipeForm) => {
		console.log(data);
		mutation.mutate(
			{ ...data, imageUrl },
			{
				onSuccess: () => {
					toast.success('created');
					form.reset();
					router.push('/');
				},
				onError: e => toast.error(e.message)
			}
		);
	};

	return (
		<FormProvider {...form}>
			<form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
				<h2 className="p-5 text-3xl">Add recipe</h2>
				<div className="flex w-full">
					<UploadThingDropzone setImageUrl={setImageUrl} />
					<div className="w-1/3 p-5">
						<FormInput className="my-2" label="Name" name="name" />
						<FormInput
							className="my-2"
							label="Description"
							name="description"
						/>
						<FormInput
							className="my-2"
							type="number"
							label="Preparation time"
							name="preparation_time"
						/>
						<VisibilitySelect />
					</div>
				</div>
				<div className="w-2/3 p-5">
					<div className="py-5">
						<IngredientSelect />
					</div>
					<div className="pb-5">
						<CategorySelect />
					</div>
				</div>
				<div className="flex w-2/3 justify-center">
					<Button variant="outline" size="lg" type="submit">
						Save
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default DynamicForm;
