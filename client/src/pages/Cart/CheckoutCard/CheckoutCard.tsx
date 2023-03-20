import { Grid, Typography } from '@mui/material';
import React from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker/DateTimePicker';
import { MainCard } from './CheckoutCard.styled';

export const CheckoutCard: React.FunctionComponent = () => {
	return (
		<MainCard sx={{ py: 2, }}>
			<Grid display="flex" flexDirection="column" gap={3} maxWidth="384px" sx={{ overflowX: 'auto', }}>
				<Typography variant="h6" sx={{ px: 1, }}>Total: R$ 7,20</Typography>
				<DateTimePicker orientation="portrait" okButtonLabel="Fazer Pedido"/>
				<Typography variant="body1" textAlign="justify" sx={{ px: 1, }}>Todas as nossas entregas são feitas no Bloco 1B na Universidade Federal de Uberlândia!</Typography>
				<Typography variant="body1" textAlign="justify" sx={{ px: 1, }}>Após a finalização do pedido, compareça no local na data e horário marcados para receber seu pedido.</Typography>
				<Typography variant="body1" textAlign="justify" sx={{ px: 1, }}>Se você deseja receber o pedido em outro local ou precisar de alguma ajuda, entre em contato com o Rafael ou Fellype pelo whatsapp abaixo.</Typography>
			</Grid>
		</MainCard>
	);
};