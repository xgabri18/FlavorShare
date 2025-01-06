'use server';

import { db } from "@/db";
import { RestaurantForm } from "@/components/form/restaurant-form-schema";
import { restaurants } from "@/db/schema/restaurant";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { checkCheffsExist } from "./check-cheffs-exist";


export const updateRestaurant = async ({restaurantId, cheffs, userId, ...data}: RestaurantForm & {restaurantId: number, userId: string}) => {
    await checkCheffsExist(cheffs);

    await db.update(restaurants).set({name: data.name, location: data.location}).where(eq(restaurants.id, restaurantId));
    const dbCheffs = await db.select().from(users).where(eq(users.restaurant_id, restaurantId));
    dbCheffs.forEach(async dbCheff => {
        if (!cheffs.find(cheff => cheff.name === dbCheff.name)) {
            await db.update(users).set({restaurant_id: null}).where(eq(users.id, dbCheff.id));
        }
    })
    const updatedDbCheffs = await db.select().from(users).where(eq(users.restaurant_id, restaurantId));
    cheffs.forEach(async cheff => {
        if (!updatedDbCheffs.find(dbCheff => dbCheff.name === cheff.name)) {
            await db.update(users).set({restaurant_id: restaurantId}).where(eq(users.name, cheff.name));
        }
    })
};