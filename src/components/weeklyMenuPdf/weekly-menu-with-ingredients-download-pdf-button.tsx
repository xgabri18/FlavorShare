'use client';

import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';

import { fetchWeeklyMenuWithIngredients } from '@/components/weeklyMenuPdf/actions';

import WeeklyMenuWithIngredientsPDF from './WeeklyMenuWithIngredientsPDF';

type Props = {
	restaurantId: number;
};

const WeeklyMenuWithIngredientsDownloadPdfButton = ({
	restaurantId
}: Props) => {
	const [loading, setLoading] = useState<boolean>(false);

	const handleDownloadClick = async () => {
		setLoading(true);

		const menuData = await fetchWeeklyMenuWithIngredients(restaurantId);

		const doc = <WeeklyMenuWithIngredientsPDF menuData={menuData} />;
		const pdfBlob = await pdf(doc).toBlob();

		const link = document.createElement('a');
		link.href = URL.createObjectURL(pdfBlob);
		link.download = 'weekly_menu_with_ingredients.pdf';
		link.click();

		setLoading(false);
	};

	return (
		<button
			onClick={handleDownloadClick}
			className="rounded bg-blue-700 p-2 text-white hover:bg-blue-400"
			disabled={loading}
		>
			{loading ? 'Generating PDF...' : 'Download Shop List'}
		</button>
	);
};

export default WeeklyMenuWithIngredientsDownloadPdfButton;
