'use client';
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { deleteRestaurant } from "@/server-actions/delete-restaurant";

export const DeleteRestaurantButton = ({restaurantId}: {restaurantId: number}) => {
    const router = useRouter();
    const onClick = () => {
        deleteRestaurant(restaurantId);
        router.push('/');
    }
    return <Button onClick={onClick} className="mx-5 rounded bg-red-500 px-4 py-2 text-white hover:bg-blue-600" >Delete</Button>;
}