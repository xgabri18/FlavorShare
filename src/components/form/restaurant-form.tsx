'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useCreateRestaurantMutation } from '@/queries/create-restaurant';
import { useUpdateRestaurantMutation } from '@/queries/update-restaurant';

import { Button } from '../ui/button';

import { CheffSelect } from './chef-select';
import { FormInput } from './form-input';
import {
	restaurantFormSchema,
	type RestaurantForm
} from './restaurant-form-schema';

type RestaurantFormProps = {
	userId: string;
	restaurantId: number | null;
	data: RestaurantForm | null;
};

const RestaurantFormComponent = ({ ...props }: RestaurantFormProps) => {
	const form = useForm<RestaurantForm>({
		resolver: zodResolver(restaurantFormSchema),
		defaultValues: props.data ?? undefined,
		mode: 'onSubmit',
		reValidateMode: 'onSubmit'
	});
	const createMutation = useCreateRestaurantMutation();
	const updateMutation = useUpdateRestaurantMutation();

	const router = useRouter();

	const onCreate = (data: RestaurantForm) => {
		createMutation.mutate(
			{ userId: props.userId, ...data },
			{
				onSuccess: () => {
					toast.success('Restaurant added.');
					router.back();
				},
				onError: e => {
					toast.error(e.message);
				}
			}
		);
	};

	const onUpdate = (data: RestaurantForm) => {
		updateMutation.mutate(
			{ userId: props.userId, restaurantId: props.restaurantId ?? 0, ...data },
			{
				onSuccess: () => {
					toast.success('Restaurant updated.');
					router.back();
				},
				onError: e => {
					toast.error(e.message);
				}
			}
		);
	};

	return (
		<FormProvider {...form}>
			<Button
				onClick={() => router.back()}
				className="invisible fixed m-4 w-24 rounded-xl bg-stone-400 text-xl hover:bg-blue-600 md:visible"
				type="button"
			>
				<ArrowLeft />
				Back
			</Button>
			<form
				onSubmit={form.handleSubmit(
					props.restaurantId === null ? onCreate : onUpdate
				)}
				className="mx-auto flex w-full flex-col items-center justify-center p-5 md:w-1/2 md:p-0 lg:w-1/3"
			>
				<h2 className="w-full py-8 text-4xl">Add restaurant</h2>
				<div className="flex-column w-full justify-center text-xl">
					<FormInput
						className="my-5 flex h-10 w-full rounded-xl border-none bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground"
						label="Name"
						name="name"
					/>
					<FormInput
						className="my-5 flex h-10 w-full rounded-xl border-none bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground"
						label="Location"
						name="location"
					/>
					<CheffSelect />
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
							onClick={() => {
								router.back();
							}}
							variant="default"
							size="lg"
							type="button"
							className="m-4 rounded-xl border border-8 border-red-600 bg-red-600 text-xl text-stone-200 hover:border-red-700 hover:bg-red-300 hover:text-black"
						>
							Cancel
						</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export default RestaurantFormComponent;
