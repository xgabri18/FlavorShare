'use server';

import { db } from '@/db';
import { users } from '@/db/schema/user';
import { eq, and, isNull } from 'drizzle-orm';


export const checkCheffsExist = async (cheffs: {name: string}[]) => {
    const existing_cheffs = (await db.select().from(users).where(and(eq(users.chef, true), isNull(users.restaurant_id)))).map(x => x.name);
    for (let i = 0; i < cheffs.length; i++) {
        if (!existing_cheffs.includes(cheffs[i].name)) {
            throw new Error(`Cheff \'${cheffs[i].name}\' does not exist or is already working elsewhere.`);
        }
    }
};
