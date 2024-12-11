import React, { type PropsWithChildren } from 'react';

type MenuOptionsProps = React.HTMLAttributes<HTMLParagraphElement> &
	PropsWithChildren;

const MenuOptions: React.FC<MenuOptionsProps> = ({ children, ...props }) => (
	<p {...props}>{children}</p>
);

export default MenuOptions;
