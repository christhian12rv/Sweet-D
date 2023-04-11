import { Box, Grid, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { MainButton } from '../../../../components/MainButton';
import brlCurrencyFormatter from '../../../../utils/brlCurrencyFormatter';

type Props = {
	ordersTotalPricePerMonthData: any;
	dateChoice: dayjs.Dayjs;
	setDateChoice: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
	setIsFetchOrders: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TotalPricesOfOrdersPerMonthChart: React.FunctionComponent<Props> = ({ ordersTotalPricePerMonthData, dateChoice, setDateChoice, setIsFetchOrders, }) => {
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: 2,
			height: '450px',
			minHeight: '450px',
			boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
			borderRadius: '4px',
			p: 3,
		}}>
			<Typography variant="h6" sx={{ mb: 1, }}>Renda total de pedidos por mês</Typography>

			<Grid display="flex" alignItems="center"  gap={2}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label={'Ano e mês'}
						views={['month', 'year']}
						sx={{ flexGrow: 1, }}
						value={dateChoice}
						onChange={(value): any => setDateChoice(value || dayjs())}
					/>
				</LocalizationProvider>
				<MainButton onClick={(): any => setIsFetchOrders(true)} style={{ height: '56px', }}>Buscar</MainButton>
			</Grid>
					
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={ordersTotalPricePerMonthData}
					margin={{ left: 50, }}
				>
					<defs>
						<linearGradient id="totalPriceOfOrdersPerDaysOfMonthGradient" x1="1" y1="1" x2="0" y2="0">
							<stop offset="40%" stopColor="#FFFFFF" stopOpacity={1} />
							<stop offset="95%" stopColor="#ffecb3" stopOpacity={1} />
						</linearGradient>
					</defs>
					<CartesianGrid vertical={false} stroke="#eeeeee" />
					<XAxis dataKey="name" tickLine={false}/>
					<YAxis tickLine={false} tickFormatter={(value): any => brlCurrencyFormatter.format(value)} />
					<Tooltip content={({ payload, label, active, }): any => {
						if (active) {
							return (
								<Box sx={(theme): object => ({
									backgroundColor: theme.palette.common.white,
									p: 1,
									borderRadius: '4px',
									boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
									border: 'none',
									outline: 'none',
								})}>
									<Typography variant="body1">Dia {label}</Typography>
									<Typography variant="body1">Total: {brlCurrencyFormatter.format(payload ? payload[0].value : 0)}</Typography>
								</Box>
							);
						}

						return null;
					}}/>

					<Area type="monotone" dataKey="totalPrice" stroke="#ffc107" strokeWidth={2} fillOpacity={1} fill="url(#totalPriceOfOrdersPerDaysOfMonthGradient)" />
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	);
};