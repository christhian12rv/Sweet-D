import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import brlCurrencyFormatter from '../../../../utils/brlCurrencyFormatter';

type Props = {
	ordersTotalPricePerYearData: any;
}

export const TotalPricesOfOrdersPerYearChart: React.FunctionComponent<Props> = ({ ordersTotalPricePerYearData, }) => {
	const now = dayjs();

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: 2,
			height: '350px',
			minHeight: '350px',
			boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
			borderRadius: '4px',
			p: 3,
		}}>
			<Typography variant="h6" sx={{ mb: 1, }}>Renda total de pedidos - {now.get('year')}</Typography>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={ordersTotalPricePerYearData}
					margin={{ left: 50, }}
				>
					<defs>
						<linearGradient id="totalPriceOfOrdersPerMonthGradient" x1="1" y1="1" x2="0" y2="0">
							<stop offset="40%" stopColor="#FFFFFF" stopOpacity={1} />
							<stop offset="95%" stopColor="#80cbc4" stopOpacity={1} />
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
									<Typography variant="body1">{label}</Typography>
									<Typography variant="body1">Total: {brlCurrencyFormatter.format(payload ? payload[0].value : 0)}</Typography>
								</Box>
							);
						}

						return null;
					}}/>

					<Area type="monotone" dataKey="totalPrice" stroke="#4db6ac" strokeWidth={2} fillOpacity={1} fill="url(#totalPriceOfOrdersPerMonthGradient)" />
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	);
};