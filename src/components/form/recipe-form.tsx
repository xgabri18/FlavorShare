'use client';

import React, { useState } from 'react';
import {
	useForm,
	FormProvider,
} from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useCreateRecipeMutation } from '@/queries/create-recipe';

import { Button } from '../ui/button';

import { FormInput } from './form-input';
import { type RecipeForm, recipeFormSchema } from './recipe-form-schema';
import { UploadThingDropzone } from './uploadthing-dropzone';
import { IngredientSelect } from './ingredient-select';
import { VisibilitySelect } from './visibility-select';
import { CategorySelect } from './category-select';

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
