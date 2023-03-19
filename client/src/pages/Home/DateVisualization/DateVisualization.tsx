import { Grid, Typography, useMediaQuery } from '@mui/material';
import { LocalizationProvider, PickersActionBar, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { CardBox, Title } from './DateVisualization.styled';
import dayjs from 'dayjs';
import ScreenSizeQuerysEnum from '../../../types/enums/ScreenSizeQuerysEnum';

export const DateVisualization: React.FunctionComponent = () => {
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');

	const now = dayjs();
	const maxDate = now.add(7, 'day');
	const minTime = now.set('hour', 10);
	const maxTime = now.set('hour', 18);

	const disableWeekends = (date): boolean => {
		return date.get('day') === 0 || date.get('day') === 6;
	};

	const handleAcceptDateTime = (dateTime: dayjs.Dayjs | null): void => {
		console.log(dateTime?.get('hour'));
	};

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={8} width="100%">
			<Title variant="h5" fontWeight="bold" sx={{ mb: '.5em', }}>
				Marque um dia e horário para sua entrega
			</Title>
			<Typography>
				Todas as nossas entregas são feitas no Bloco 1B na Universidade Federal de Uberlândia!
			</Typography>
			<CardBox mt={8}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<StaticDateTimePicker
						ampm={false}
						orientation={isMobile ? 'portrait' : 'landscape'}
						minDate={now}
						maxDate={maxDate}
						shouldDisableDate={disableWeekends}
						minTime={minTime}
						maxTime={maxTime}
						onAccept={(dateTime): any => handleAcceptDateTime(dateTime)}
					/>
				</LocalizationProvider>
			</CardBox>
		</Grid>
	);
};