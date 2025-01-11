import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

type Props = {
	daysOfWeek: string[];
	groupedByDay: Record<string, string[]>;
};

const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontFamily: 'Times-Roman'
	},
	title: {
		fontSize: 32,
		marginBottom: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	daySection: {
		marginBottom: 20
	},
	dayTitle: {
		fontSize: 24,
		marginBottom: 10,
		fontWeight: 'semibold'
	},
	listItem: {
		fontSize: 16,
		marginBottom: 5
	}
});

const WeeklyMenuPDF = ({ daysOfWeek, groupedByDay }: Props) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<Text style={styles.title}>Weekly Menu</Text>
			{daysOfWeek.map(day => (
				<View key={day} style={styles.daySection}>
					<Text style={styles.dayTitle}>
						{day.charAt(0).toUpperCase() + day.slice(1)}
					</Text>
					{groupedByDay[day].length > 0 ? (
						groupedByDay[day].map((recipeName, index) => (
							<Text key={index} style={styles.listItem}>
								{index + 1}. {recipeName}
							</Text>
						))
					) : (
						<Text style={styles.listItem}>No recipes available</Text>
					)}
				</View>
			))}
		</Page>
	</Document>
);

export default WeeklyMenuPDF;
