import { z } from 'zod';

export const cheff = z.object({
	name: z.string()
});

export const restaurantFormSchema = z.object({
	name: z.string().min(3),
	location: z.string(),
	cheffs: z.array(cheff)
});

export type RestaurantForm = z.infer<typeof restaurantFormSchema>;
