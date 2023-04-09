import { useMediaQuery } from '@mui/material';
import { LocalizationProvider, ruRU, StaticDateTimePicker } from '@mui/x-date-pickers';
import React from 'react';
import ScreenSizeQuerysEnum from '../../types/enums/ScreenSizeQuerysEnum';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ptBr from 'dayjs/locale/pt-br';

type Props = {
	orientation?: 'portrait' | 'landscape' | undefined;
	okButtonLabel?: string | undefined,
};

export const DateTimePicker: React.FunctionComponent<Props> = ({ orientation, okButtonLabel, }) => {
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');

	const now = dayjs();
	const maxDate = now.add(7, 'day');
	const minTime = now.set('hour', 10);
	const maxTime = now.set('hour', 18);

	const disableWeekends = (date): boolean => {
		return date.get('day') === 0 || date.get('day') === 6;
	};

	const handleAcceptDateTime = (dateTime: dayjs.Dayjs | null): void => {
		// console.log(dateTime?.get('hour'));
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
				onAccept={(dateTime): any => handleAcceptDateTime(dateTime)}
				localeText={{
					cancelButtonLabel: 'Resetar',
					okButtonLabel: okButtonLabel ? okButtonLabel : 'OK',
				}}
			/>
		</LocalizationProvider>
	);
};