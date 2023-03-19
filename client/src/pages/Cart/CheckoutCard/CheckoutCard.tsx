import { Grid, Typography } from '@mui/material';
import React from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker/DateTimePicker';
import { MainCard } from './CheckoutCard.styled';

export const CheckoutCard: React.FunctionComponent = () => {
	return (
		<MainCard sx={{ p: 2, }}>
			<Grid display="flex" flexDirection="column" gap={3}>
				<Typography variant="h6">Total: R$ 7,20</Typography>
				<DateTimePicker orientation="portrait" okButtonLabel="Fazer Pedido"/>
				
			</Grid>
		</MainCard>
	);
};