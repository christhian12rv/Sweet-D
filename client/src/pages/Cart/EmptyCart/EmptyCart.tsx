import React from 'react';
import { ProductionQuantityLimitsRounded } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { MainButton } from '../../../components/MainButton';

export const EmptyCart: React.FunctionComponent = () => {
	return (
		<Grid display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" gap={0.5}>
			<ProductionQuantityLimitsRounded sx={(theme): object => ({ color: theme.palette.grey[700], fontSize: '10em', })}/>
			<Grid display="flex" alignItems="center" justifyContent="center">
				<Typography variant="h5">Seu carrinho está</Typography>
				<Typography variant="h5" sx={(theme): object => ({ color: theme.palette.primary.dark, })}>&nbsp;vazio</Typography>
			</Grid>

			<Typography variant="body1" sx={{ mb: 2, }}>Adicione items ao carrinho para prosseguir com a compra</Typography>

			<LinkUnstyled to={RoutesEnum.PRODUCTS}>
				<MainButton>Produtos</MainButton>
			</LinkUnstyled>
		</Grid>
	);
};