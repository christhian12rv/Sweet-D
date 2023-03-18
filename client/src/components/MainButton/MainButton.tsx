import { ButtonProps } from '@mui/material';
import React from 'react';
import { ButtonStyled } from './MainButton.styled';

type Props = {
	design: ['square', 'rounded']
}

export const MainButton: React.FunctionComponent<ButtonProps> = (props) => {
	return (
		<ButtonStyled onClick={props.onClick} style={props.style}>
			{props.children}
		</ButtonStyled>
	);
};