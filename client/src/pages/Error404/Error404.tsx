import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { BoxArea, GridContainer } from './Error404.styled';
import ScaredWatermelonImg from '../../assets/img/Scared-Watermelon.png';
import { MainButton } from '../../components/MainButton';
import { LinkUnstyled } from '../../components/LinkUnstyled';

export const Error404: React.FunctionComponent = () => {
	return (
		<BoxArea>
			<GridContainer>
				<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" textAlign="center">
					<Box component="img" src={ScaredWatermelonImg} sx={{ width: '250px', }}/>
					<Typography variant="h1" sx={(theme): any => ({ color: theme.palette.primary.dark, fontSize: '8em', })}>404</Typography>
				</Grid>
				<Grid display="flex" flexDirection="column" alignItems="center" textAlign="center" justifyContent="center">
					<Typography variant="h5" sx={{ mb: 1, }}>Página não encontrada</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[800], })}>Oops... A página que você tentou acessar não existe.</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[800], mb: 2, })}>Você pode voltar à página inicial ou tentar acessar uma nova página.</Typography>
					<LinkUnstyled to="/">
						<MainButton design="rounded">Página Inicial</MainButton>
					</LinkUnstyled>
				</Grid>
			</GridContainer>
		</BoxArea>
	);
};