import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		padding: 30
	},
	title: {
		fontSize: 28,
		marginBottom: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	recipeTitle: {
		fontSize: 20,
		marginBottom: 10,
		fontWeight: 'semibold'
	},
	ingredientList: {
		marginBottom: 15
	},
	ingredient: {
		fontSize: 14,
		marginBottom: 5
	}
});

type Props = {
	menuData: Record<
		string,
		{ ingredient: string; amount: number; unit: string }[]
	>;
};

const WeeklyMenuWithIngredientsPDF = ({ menuData }: Props) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<Text style={styles.title}>Weekly Menu with Ingredients</Text>
			{Object.entries(menuData).map(([recipeName, ingredients]) => (
				<View key={recipeName} style={styles.ingredientList}>
					<Text style={styles.recipeTitle}>{recipeName}</Text>
					{ingredients.map((item, index) => (
						<Text key={index} style={styles.ingredient}>
							• {item.amount} {item.unit} of {item.ingredient}
						</Text>
					))}
				</View>
			))}
		</Page>
	</Document>
);

export default WeeklyMenuWithIngredientsPDF;
