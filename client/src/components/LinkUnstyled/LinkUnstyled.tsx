
import { SxProps, Theme } from '@mui/system';
import React from 'react';
import { LinkProps } from 'react-router-dom';
import { LinkStyled } from './LinkUnstyled.styled';

type Props = {
	sx?: SxProps<Theme> | undefined
} & LinkProps;

export const LinkUnstyled: React.FunctionComponent<Props> = (props) => {
	return (
		<LinkStyled {...props}>
			{props.children}
		</LinkStyled>
	);
};