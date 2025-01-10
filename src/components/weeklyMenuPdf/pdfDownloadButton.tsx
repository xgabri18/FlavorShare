'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';

import { fetchWeeklyMenuWithIngredients } from '@/components/weeklyMenuPdf/actions';

import WeeklyMenuWithIngredientsPDF from './WeeklyMenuWithIngredientsPDF';

type Props = {
	restaurantId: number;
};

const PdfDownloadButton = ({ restaurantId }: Props) => {
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
			className="rounded bg-blue-500 p-2 text-white"
			disabled={loading}
		>
			{loading ? 'Generating PDF...' : 'Download PDF'}
		</button>
	);
};

export default PdfDownloadButton;
