'use client';

import { updateRestaurant } from "@/server-actions/update-restaurant";
import { useMutation } from "@tanstack/react-query";

export const useUpdateRestaurantMutation = () => 
    useMutation({
        mutationFn: updateRestaurant
    });