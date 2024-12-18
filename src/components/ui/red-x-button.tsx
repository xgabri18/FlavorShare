import { Loader, X } from 'lucide-react';

import { Button } from './button';

type RedXButtonProps = {
	onClick: () => void;
	isLoading: boolean;
	className: string;
};

export const RedXButton = ({
	onClick,
	isLoading,
	className
}: RedXButtonProps) => (
	<Button
		type="button"
		className={`${className} rounded-xl bg-stone-400 hover:bg-red-600`}
		variant="default"
		onClick={onClick}
		onSubmit={() => false}
	>
		{isLoading ? <Loader className="animate-spin" /> : <X />}
	</Button>
);
