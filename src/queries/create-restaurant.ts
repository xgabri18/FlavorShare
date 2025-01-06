'use client';

import { addRestaurant } from "@/server-actions/add-restaurant";
import { useMutation } from "@tanstack/react-query";

export const useCreateRestaurantMutation = () => 
    useMutation({
        mutationFn: addRestaurant
    });