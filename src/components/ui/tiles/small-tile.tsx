export const SmallTile = ({ content }: { content: string }) => (
	<div className="pointer-events-none w-min content-center text-nowrap rounded-full bg-stone-400 px-2 pb-1">
		<span className="content-center">{content}</span>
	</div>
);
