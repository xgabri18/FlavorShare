import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { recipes } from '@/db/schema/recipe';
import { ingredients } from '@/db/schema/ingredient';
import { categories } from '@/db/schema/category';
import { Filter } from '@/components/filter/filter';
import { usedIngredients } from '@/db/schema/usedIngredient';
import { recipeCategories } from '@/db/schema/recipeCategory';

const Page = async () => {
	const allRecipes = await db
		.select()
		.from(recipes)
		.where(eq(recipes.visibility, 'public'));
	const ingredientsInRecipes = await db.select().from(usedIngredients);
	const categoryOfRecipes = await db.select().from(recipeCategories);
	const allIngredients = await db.select().from(ingredients);
	const allCategories = await db.select().from(categories);

	const cookingTime = allRecipes.map(recipe => recipe.preparation_time);
	const minMaxTime: [number, number] = [
		Math.min(...cookingTime),
		Math.max(...cookingTime)
	];

	return (
		<Filter
			categories={allCategories}
			recipes={allRecipes}
			ingredient={allIngredients}
			cookingTime={minMaxTime}
			recipesIngredients={ingredientsInRecipes}
			recipeCategory={categoryOfRecipes}
		/>
	);
};
export default Page;
