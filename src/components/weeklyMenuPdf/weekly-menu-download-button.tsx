'use client';

import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';

import WeeklyMenuPDF from '@/components/weeklyMenuPdf/WeeklyMenuPDF';
import { fetchWeeklyMenuData } from '@/components/weeklyMenuPdf/actions';

type Props = {
	restaurantId: number;
};

const PdfDownloadButton = ({ restaurantId }: Props) => {
	const [loading, setLoading] = useState<boolean>(false);

	const handleDownloadClick = async () => {
		setLoading(true);

		const data = await fetchWeeklyMenuData(restaurantId);

		const doc = (
			<WeeklyMenuPDF daysOfWeek={Object.keys(data)} groupedByDay={data} />
		);
		const pdfBlob = await pdf(doc).toBlob();

		const link = document.createElement('a');
		link.href = URL.createObjectURL(pdfBlob);
		link.download = 'weekly_menu.pdf';
		link.click();

		setLoading(false);
	};

	return (
		<button
			onClick={handleDownloadClick}
			className="rounded bg-blue-700 p-2 text-white hover:bg-blue-400"
			disabled={loading}
		>
			{loading ? 'Generating PDF...' : 'Download Weekly Menu'}
		</button>
	);
};

export default PdfDownloadButton;
