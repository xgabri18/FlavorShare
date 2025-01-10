'use client';

export const StaticMenuList = ({
	menu
}: {
	menu: Record<string, { recipe_name: string }[]>;
}) => {
	return (
		<div>
			{Object.keys(menu).map(day => (
				<div key={day}>
					<h2 className="text-xl font-semibold">{day}</h2>
					{menu[day].length !== 0 ? (
						<ol className="list-inside list-decimal">
							{menu[day].map((item, index) => (
								<li key={index} className="text-lg">
									{item.recipe_name}
								</li>
							))}
						</ol>
					) : (
						<p className="text-sm text-gray-400">-----</p>
					)}
				</div>
			))}
		</div>
	);
};
