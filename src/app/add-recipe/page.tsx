import { auth } from '@/auth';
import DynamicForm from '@/components/form/recipe-form';
import { redirect } from 'next/navigation';

const Page = async () => {
	const session = await auth();
	if (!session?.user || !session.user.id)
	{
		redirect('/auth/signing');
	}

	return (
		<main className="md:container md:w-4/5">
			<div className="flex">
				<DynamicForm userId={session?.user?.id} data={null} photoUrl={null} recipeId={null}/>
			</div>
		</main>
	);
};

export default Page;
