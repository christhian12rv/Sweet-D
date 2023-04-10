import { useMediaQuery } from '@mui/material';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import React from 'react';
import ScreenSizeQuerysEnum from '../../types/enums/ScreenSizeQuerysEnum';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ptBr from 'dayjs/locale/pt-br';

type Props = {
	orientation?: 'portrait' | 'landscape' | undefined;
	okButtonLabel?: string | undefined;
	onAccept?: (dateTime: dayjs.Dayjs | null) => void;
	shouldDisableDate?: ((day: unknown) => boolean) | undefined;
	minTime?: dayjs.Dayjs | undefined;
	maxTime?: dayjs.Dayjs | undefined;
};

export const DateTimePicker: React.FunctionComponent<Props> = ({ orientation, okButtonLabel, onAccept, shouldDisableDate, minTime, maxTime, }) => {
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');

	const now = dayjs();
	const maxDate = now.add(7, 'day');

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBr} localeText={{
			dateTimePickerToolbarTitle: 'Selecione a data e horário',
		}}>
			<StaticDateTimePicker
				ampm={false}
				orientation={orientation ? orientation : (isMobile ? 'portrait' : 'landscape')}
				minDate={now}
				maxDate={maxDate}
				{...shouldDisableDate && { shouldDisableDate, }}
				{...minTime && { minTime, }}
				{...maxTime && { maxTime, }}
				{...onAccept && { onAccept: (dateTime): any => {
					onAccept && onAccept(dateTime);
				}, }}
				localeText={{
					cancelButtonLabel: 'Resetar',
					okButtonLabel: okButtonLabel ? okButtonLabel : 'OK',
				}}
				sx={(theme): object => ({
					'& .MuiDialogActions-root .MuiButton-root:last-child': {
						backgroundColor: theme.palette.primary.light,
						color: theme.palette.secondary.main,
						px: 2,
					},
					'& .MuiDialogActions-root .MuiButton-root:last-child:hover': {
						backgroundColor: theme.palette.primary.main,
					},
				})}
			/>
		</LocalizationProvider>
	);
};