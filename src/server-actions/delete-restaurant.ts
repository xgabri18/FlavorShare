'use server';

import { db } from "@/db";
import { restaurants } from "@/db/schema/restaurant";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export const deleteRestaurant = async (id: number) => {
    await db.delete(restaurants).where(eq(restaurants.id, id));
    await db.update(users).set({restaurant_id: null}).where(eq(users.restaurant_id, id));
};
