import updateRecipe from "@/server-actions/update-recipe";
import { useMutation } from "@tanstack/react-query";


export const useUpdateRecipeMutation = () => {
    return useMutation({
        mutationFn: updateRecipe
    });
};
