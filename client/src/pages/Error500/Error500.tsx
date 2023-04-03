import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { BoxArea, GridContainer } from './Error500.styled';
import ScaredPineappleImg from '../../assets/img/Scared-Pineapple.png';
import { MainButton } from '../../components/MainButton';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { useTitle } from '../../utils/hooks/useTitle';

export const Error500: React.FunctionComponent = () => {

	useTitle('Erro interno');

	return (
		<BoxArea>
			<GridContainer>
				<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" textAlign="center">
					<Box component="img" src={ScaredPineappleImg} sx={{ width: '250px', }}/>
					<Typography variant="h1" sx={(theme): any => ({ color: theme.palette.secondary.dark, fontSize: '8em', })}>500</Typography>
				</Grid>
				<Grid display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
					<Typography variant="h5" sx={{ mb: 1, }}>Erro interno</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[800], })}>Ocorreu um erro interno do servidor.</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[800], mb: 2, })}>Tente novamente mais tarde ou entre em contato.</Typography>
					<LinkUnstyled to="/">
						<MainButton design="rounded">Página Inicial</MainButton>
					</LinkUnstyled>
				</Grid>
			</GridContainer>
		</BoxArea>
	);
};