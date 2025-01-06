import { checkRestaurantName } from "@/server-actions/check-restaurant-name";
import { z } from "zod";


export const cheff = z.object({
    name: z.string()
});

export const restaurantFormSchema = z.object({
    name: z.string().min(3).refine(
        async (name) => await checkRestaurantName(name),
        (name) => ({message: `Restaurant with name \'${name}\' already exists.`}),
    ),
    location: z.string(),
    cheffs: z.array(cheff)
});


export type RestaurantForm = z.infer<typeof restaurantFormSchema>;
