import { Grid, Typography } from '@mui/material';
import React from 'react';
import { CardBox, Title } from './DateVisualization.styled';
import { DateTimePicker } from '../../../components/DateTimePicker/DateTimePicker';

export const DateVisualization: React.FunctionComponent = () => {
	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={8} width="100%">
			<Title variant="h5" fontWeight="bold" sx={{ mb: '.5em', }}>
				Marque um dia e horário para sua entrega
			</Title>
			<Typography>
				Todas as nossas entregas são feitas no Bloco 1B na Universidade Federal de Uberlândia!
			</Typography>
			<CardBox mt={8} sx={{ maxWidth: '90vw', overflowX: 'auto', }}>
				<DateTimePicker okButtonLabel="OK"/>
			</CardBox>
		</Grid>
	);
};