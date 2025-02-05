'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { useCreateRecipeMutation } from '@/queries/create-recipe';
import { useUpdateRecipeMutation } from '@/queries/update-recipe';

import { Button } from '../ui/button';
import RecipeImage from '../ui/recipe-image';

import { FormInput } from './form-input';
import { type RecipeForm, recipeFormSchema } from './recipe-form-schema';
import { UploadThingDropzone } from './uploadthing-dropzone';
import { IngredientSelect } from './ingredient-select';
import { VisibilitySelect } from './visibility-select';
import { CategorySelect } from './category-select';

type DynamicFormProps = {
	userId: string | null;
	data: RecipeForm | null;
	photoUrl: string | null;
	recipeId: number | null;
};

const DynamicForm = ({ ...props }: DynamicFormProps) => {
	const form = useForm<RecipeForm>({
		resolver: zodResolver(recipeFormSchema),
		defaultValues: props.data ?? undefined
	});
	const router = useRouter();
	const [imageUrl, setImageUrl] = useState<string | null>(props.photoUrl);
	const createMutation = useCreateRecipeMutation();
	const updateMutation = useUpdateRecipeMutation();

	const onCreate = async (_data: RecipeForm) => {
		console.log(_data);
		createMutation.mutate(
			{ ..._data, imageUrl, userId: props.userId ?? '' },
			{
				onSuccess: () => {
					toast.success('Recipe created');
					router.push('/');
				},
				onError: e => toast.error(e.message)
			}
		);
	};
	const onUpdate = async (_data: RecipeForm) => {
		console.log(_data);
		updateMutation.mutate(
			{ ..._data, imageUrl, recipeId: props.recipeId ?? -1 },
			{
				onSuccess: () => {
					toast.success('Recipe updated');
					router.push(`/recipe/${props.recipeId}`);
				},
				onError: e => toast.error(e.message)
			}
		);
	};

	const deleteImage = () => {
		setImageUrl(null);
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex-column w-full content-center justify-center self-center bg-stone-200 text-lg"
				onSubmit={form.handleSubmit(
					props.recipeId === null ? onCreate : onUpdate
				)}
			>
				<Button
					onClick={e => {
						e.preventDefault();
						router.push(
							props.recipeId === null ? '/' : `/recipe/${props.recipeId}`
						);
					}}
					className="m-4 w-24 rounded-xl bg-stone-400 text-xl hover:bg-blue-600"
				>
					<ArrowLeft />
					Back
				</Button>
				<h2 className="p-5 text-4xl">Add recipe</h2>
				<div className="flex-column w-full md:flex">
					{imageUrl === null ? (
						<div className="flex w-full">
							<UploadThingDropzone setImageUrl={setImageUrl} />
						</div>
					) : (
						<RecipeImage
							setImageUrlNull={deleteImage}
							src={imageUrl}
							alt="Recipe Image"
							width={500}
							height={500}
						/>
					)}
					<div className="flex-column w-full content-between p-3">
						<FormInput
							className="my-5 flex h-10 w-full rounded-xl border-none bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground"
							label="Name"
							name="name"
						/>
						<FormInput
							className="my-3 flex h-10 w-full rounded-xl border-none bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground"
							label="Description"
							name="description"
						/>
						<FormInput
							className="my-3 flex h-10 w-full rounded-xl border-none bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground"
							type="number"
							label="Preparation time"
							name="preparation_time"
						/>
						<VisibilitySelect />
					</div>
				</div>
				<div className="w-full p-5">
					<div className="py-5">
						<IngredientSelect />
					</div>
					<div className="w-full pb-5">
						<CategorySelect />
					</div>
					<div>
						<div className="w-full">
							<label htmlFor="steps" className="mb-3 flex text-xl">
								Instructions
							</label>
							<textarea
								id="recipeSteps"
								{...form.register('recipeSteps')}
								placeholder="Write the steps of the recipe"
								className="flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground"
							/>
							{form.formState.errors.recipeSteps !== null && (
								<span className="mt-1 text-sm text-red-600">
									{form.formState.errors.recipeSteps?.message?.toString()}
								</span>
							)}
						</div>
					</div>
				</div>
				<div className="mb-10 flex w-full justify-center">
					<Button
						variant="default"
						size="lg"
						type="submit"
						className="m-4 rounded-xl border border-8 border-green-600 bg-green-600 text-xl text-stone-200 hover:border-green-700 hover:bg-green-300 hover:text-black"
					>
						Save
					</Button>
					<Button
						onClick={e => {
							e.preventDefault();
							router.back();
						}}
						variant="default"
						size="lg"
						className="m-4 rounded-xl border border-8 border-red-600 bg-red-600 text-xl text-stone-200 hover:border-red-700 hover:bg-red-300 hover:text-black"
					>
						Cancel
					</Button>
				</div>
			</form>
			<div className="h-1/2" />
		</FormProvider>
	);
};

export default DynamicForm;
