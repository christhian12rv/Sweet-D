import { ButtonProps } from '@mui/material';
import React from 'react';
import { ButtonStyled } from './MainButton.styled';

type Props = {
	design?: 'square' | 'rounded' | undefined;
} & ButtonProps;

export const MainButton: React.FunctionComponent<Props> = (props) => {
	return (
		<ButtonStyled type={props.type} onClick={props.onClick} style={props.style} design={props.design ? props.design : 'square'}>
			{props.children}
		</ButtonStyled>
	);
};