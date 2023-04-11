import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

type Props = {
	ordersQuantityPerYearData: any;
}

export const  TotalQuantityOfOrdersPerYearChart: React.FunctionComponent<Props> = ({ ordersQuantityPerYearData, }) => {
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
			<Typography variant="h6" sx={{ mb: 1, }}>Quantidade total de pedidos - {now.get('year')}</Typography>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={ordersQuantityPerYearData}
				>
					<defs>
						<linearGradient id="totalQuantityOfOrdersGradient" x1="1" y1="1" x2="0" y2="0">
							<stop offset="40%" stopColor="#FFFFFF" stopOpacity={1} />
							<stop offset="95%" stopColor="#82b1ff" stopOpacity={1} />
						</linearGradient>
					</defs>
					<CartesianGrid vertical={false} stroke="#eeeeee" />
					<XAxis dataKey="name" tickLine={false}/>
					<YAxis tickLine={false}/>
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
									<Typography variant="body1">Pedidos: {payload ? payload[0].value : 0}</Typography>
								</Box>
							);
						}

						return null;
					}}/>

					<Area type="monotone" dataKey="quantity" stroke="#5c6bc0" strokeWidth={2} fillOpacity={1} fill="url(#totalQuantityOfOrdersGradient)" />
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	);
};