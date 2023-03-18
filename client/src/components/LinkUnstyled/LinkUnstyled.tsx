import React from 'react';
import { LinkProps } from 'react-router-dom';
import { LinkStyled } from './LinkUnstyled.styled';

export const LinkUnstyled: React.FunctionComponent<LinkProps> = (props) => {
	return (
		<LinkStyled {...props}>
			{props.children}
		</LinkStyled>
	);
};