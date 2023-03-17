import React from 'react';
import { LinkUnstyled } from './LinkUnstyled.styled';

type Props = {
	to: string;
	children: any
};

export const Navbar: React.FunctionComponent<Props> = (props) => {
	return (
		<LinkUnstyled to={props.to}>
			{props.children}
		</LinkUnstyled>
	);
};