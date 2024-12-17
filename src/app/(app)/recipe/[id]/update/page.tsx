import { auth } from '@/auth';
import DynamicForm from '@/components/form/recipe-form';
import { recipeFormSchema } from '@/components/form/recipe-form-schema';
import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import getRecipeWithRelated from '@/server-actions/get-recipe-with-related';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

type RecipePageProps = {
	params: {
		id: string;
	};
};

const Page = async ({ params }: RecipePageProps) => {
	const { id } = await params; // This is apparently required from Next 15 https://stackoverflow.com/questions/79143162/route-locale-used-params-locale-params-should-be-awaited-before-using
	const session = await auth();
	if (!session?.user || !session.user.id)
	{
		redirect('/auth/signing');
	}
    const recipe = await getRecipeWithRelated(Number(id), session.user.id);
    if (recipe === null)
    {
        redirect('/');
    }
    // console.log(recipe);

	return (
		<main className="md:w-4/5 md:container">
			<div className="flex">
				<DynamicForm userId={null} data={recipe} photoUrl={recipe.imageUrl} recipeId={recipe.id}/>
			</div>
		</main>
	);
};

export default Page;
