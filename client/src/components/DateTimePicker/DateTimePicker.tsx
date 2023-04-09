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
};

export const DateTimePicker: React.FunctionComponent<Props> = ({ orientation, okButtonLabel, onAccept, }) => {
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');

	const now = dayjs();
	const maxDate = now.add(7, 'day');
	const minTime = now.set('hour', 10);
	const maxTime = now.set('hour', 18);

	const disableWeekends = (date): boolean => {
		return date.get('day') === 0 || date.get('day') === 6;
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBr} localeText={{
			dateTimePickerToolbarTitle: 'Selecione a data e horário',
		}}>
			<StaticDateTimePicker
				ampm={false}
				orientation={orientation ? orientation : (isMobile ? 'portrait' : 'landscape')}
				minDate={now}
				maxDate={maxDate}
				shouldDisableDate={disableWeekends}
				minTime={minTime}
				maxTime={maxTime}
				onAccept={(dateTime): any => {
					onAccept && onAccept(dateTime);
				}}
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