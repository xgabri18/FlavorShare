'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { restaurantFormSchema, RestaurantForm } from "./restaurant-form-schema";
import { FormInput } from "./form-input";
import { CheffSelect } from "./chef-select";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useCreateRestaurantMutation } from "@/queries/create-restaurant";
import { toast } from "sonner";
import { useUpdateRestaurantMutation } from "@/queries/update-restaurant";

type RestaurantFormProps = {
    userId: string,
    restaurantId: number | null,
    data: RestaurantForm | null
};


const RestaurantFormComponent = ({...props}: RestaurantFormProps) => {
    const form = useForm<RestaurantForm>({
		resolver: zodResolver(restaurantFormSchema),
		defaultValues: props.data === null ? undefined : props.data,
        mode: 'onSubmit',
		reValidateMode: 'onSubmit'
	});
    const createMutation = useCreateRestaurantMutation();
    const updateMutation = useUpdateRestaurantMutation();

    const router = useRouter();

    const onCreate = (data: RestaurantForm) => {
        createMutation.mutate({userId: props.userId, ...data}, {
            onSuccess: () => {toast.success("Restaurant added."); router.back();},
            onError: (e) => {toast.error(e.message);}
        });
    };

    const onUpdate = (data: RestaurantForm) => {
        updateMutation.mutate({userId: props.userId, restaurantId: props.restaurantId ?? 0, ...data},{
            onSuccess: () => {toast.success("Restaurant updated."); router.back();},
            onError: (e) => {toast.error(e.message);}
        });
    }
    
    return (
        <FormProvider {...form}>
            <Button
				onClick={() => router.back()}
				className='m-4 hover:bg-blue-600 w-24 rounded-xl bg-stone-400 text-xl fixed invisible md:visible'
                type="button"
				>
					<ArrowLeft/>
					back
				</Button>
            <form onSubmit={form.handleSubmit(props.restaurantId === null ? onCreate : onUpdate)} className="flex flex-col items-center justify-center lg:w-1/3 md:w-1/2 w-full mx-auto p-5 md:p-0">
                <h2 className="py-8 text-4xl w-full">Add restaurant</h2>
                <div className="flex-column justify-center w-full text-xl">
                    <FormInput 
                        className="my-5 flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground border-none"
                        label="Name"
                        name="name" 
                    />
                    <FormInput 
                        className="my-5 flex h-10 w-full rounded-xl bg-stone-400 px-3 py-2 text-lg placeholder:text-muted-foreground border-none"
                        label="Location"
                        name="location" 
                    />
                    <CheffSelect />
                    <div className="flex w-full justify-center mb-10">
                        <Button 
                        variant="default" 
                        size="lg" 
                        type="submit" 
                        className='m-4 hover:bg-green-300 bg-green-600 rounded-xl text-xl text-stone-200 hover:text-black border-green-600 hover:border-green-700 border-8 border'>
                            Save
                        </Button>
                        <Button 
                        onClick={() => {router.back();}}
                        variant="default" 
                        size="lg" 
                        type="button"
                        className='m-4 hover:bg-red-300 bg-red-600 rounded-xl text-xl text-stone-200 hover:text-black border-red-600 hover:border-red-700 border-8 border'>
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default RestaurantFormComponent;
