import { CardContent } from '@mui/material';
import React from 'react';
import { useTitle } from '../../utils/hooks/useTitle';
import { BoxArea, CardStyled, GridContainer } from './ForgotPassword.styled';

export const ForgotPassword: React.FunctionComponent = () => {

	useTitle('Recuperar sua senha');

	return (
		<BoxArea>
			<GridContainer>
				<CardStyled>
					<CardContent>
						
					</CardContent>
				</CardStyled>
			</GridContainer>
		</BoxArea>
	);
};