import { Grid, Typography } from '@mui/material';
import React from 'react';
import BackgroundColorsEnum from '../../../types/enums/BackgroundColorsEnum';
import { SizeCard } from './SizeCard';
import { Title } from './SizesSection.styled';

export const SizesSection: React.FunctionComponent = () => {
	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={8} width="100%">
			<Title variant="h5" fontWeight="bold" sx={{ mb: '.5em', }}>
				Escolha produtos com diferetes tamanhos
			</Title>
			<Typography>
				Temos produtos nos tamanhos pequeno e médio. Escolha o seu e aproveite!
			</Typography>
			<Grid display="flex" flexWrap="wrap" gap={5} justifyContent="center" alignItems="center" mt={8} width="100%">
				<SizeCard backgroundColor={BackgroundColorsEnum.PINK} size="90px"/>
				<SizeCard backgroundColor={BackgroundColorsEnum.YELLOW} size="130px"/>
			</Grid>
		</Grid>
	);
};