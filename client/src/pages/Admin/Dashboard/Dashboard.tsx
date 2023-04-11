import { CookieRounded, PeopleAltRounded, ReceiptLongRounded } from '@mui/icons-material';
import { Box, Grid,  Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip } from 'recharts';
import { TotalQuantityCard } from './TotalQuantityCard';
import { fetchDashboard as fetchDashboardAction } from '../../../store/features/dashboard/dashboard.actions';
import { findAllByYearAndMonth as findAllOrdersByYearAndMonthAction } from '../../../store/features/orders/orders.actions';
import { enqueueSnackbar } from 'notistack';
import { TotalPricesOfOrdersPerYearChart } from './TotalPricesOfOrdersPerYearChart';
import { TotalQuantityOfOrdersPerYearChart } from './TotalQuantityOfOrdersPerYearChart';
import { TotalPricesOfOrdersPerMonthChart } from './TotalPricesOfOrdersPerMonthChart';
import dayjs from 'dayjs';
import daysOfEachMonthArray from '../../../utils/daysOfEachMonthArray';


export const Dashboard: React.FunctionComponent = () => {
	const [loading, setLoading] = useState(true);
	const [ordersQuantityPerYearData, setOrdersQuantiyPerYearData] = useState<{
		name: string;
		quantity: number;
	}[]>([]);
	const [ordersTotalPricePerYearData, setOrdersTotalPricePerYearData] = useState<{
		name: string;
		totalPrice: number;
	}[]>([]);
	const [dateChoiceOfOrdersTotalPricePerMonthData, setDateChoiceOfOrdersTotalPricePerMonthData] = useState(dayjs());
	const [ordersTotalPricePerMonthData, setOrdersTotalPricePerMonthData] = useState<{
		name: number;
		totalPrice: number;
	}[]>([]);
	const [isFetchOrdersTotalPricePerMonthData, setIsFetchOrdersTotalPricePerMonthData] = useState(false);
	
	const fetchOrdersTotalPricePerMonthDate = async (): Promise<void> => {
		const findAllOrdersByYearAndMonthActionResponse = await findAllOrdersByYearAndMonthAction(
			dateChoiceOfOrdersTotalPricePerMonthData.get('year'), dateChoiceOfOrdersTotalPricePerMonthData.get('month')
		);

		const findAllOrdersByYearAndMonthActionOrders = findAllOrdersByYearAndMonthActionResponse[1].orders;

		const data: {
			name: number;
			totalPrice: number;
		}[] = [];

		for (let i = 1; i <= daysOfEachMonthArray[dateChoiceOfOrdersTotalPricePerMonthData.get('month')]; i++) {
			let totalPriceOfDay = 0;

			findAllOrdersByYearAndMonthActionOrders.filter(o => dayjs(o.createdAt).get('date') === i)
				.forEach(o => {
					o.orderProducts.forEach((orderProduct) => {
						let totalPriceOfProduct = orderProduct.sizePrice;
						
						orderProduct.orderProductIngredients.forEach((orderProductIngredients) => {
							totalPriceOfProduct += orderProductIngredients.price;
						});

						totalPriceOfProduct *= orderProduct.quantity;
						totalPriceOfDay += totalPriceOfProduct;
					});
				}),

			data.push({
				name: i,
				totalPrice: totalPriceOfDay,
			});
		}
		
		setOrdersTotalPricePerMonthData(data);
	};

	const fetchDashboard = async (): Promise<void> => {
		setLoading(true);

		const [response, json] = await fetchDashboardAction();

		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}

		setOrdersQuantiyPerYearData(json.ordersPerYear.map(opm => ({
			name: opm.month,
			quantity: opm.orders.length,
		})));

		setOrdersTotalPricePerYearData(json.ordersPerYear.map(opm => {
			let totalPriceOfMonth = 0;
			opm.orders.map((o) => {
				o.orderProducts.forEach((orderProduct) => {
					let totalPriceOfProduct = orderProduct.sizePrice;
					
					orderProduct.orderProductIngredients.forEach((orderProductIngredients) => {
						totalPriceOfProduct += orderProductIngredients.price;
					});

					totalPriceOfProduct *= orderProduct.quantity;
					totalPriceOfMonth += totalPriceOfProduct;
				});
			});

			return {
				name: opm.month,
				totalPrice: totalPriceOfMonth,
			};
		}));

		await fetchOrdersTotalPricePerMonthDate();

		setLoading(false);
	};

	useEffect(() => {
		fetchDashboard();
	}, []);

	useEffect(() => {
		setIsFetchOrdersTotalPricePerMonthData(false);
		fetchOrdersTotalPricePerMonthDate();
	}, [isFetchOrdersTotalPricePerMonthData]);

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<Typography variant="h4">Dashboard</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<TotalQuantityCard
						title="Pedidos"
						quantity={230}
						iconColor="#536dfe"
					>
						<ReceiptLongRounded/>
					</TotalQuantityCard>
				</Grid>

				<Grid item xs={12} md={4}>
					<TotalQuantityCard
						title="Produtos"
						quantity={11}
						iconColor="#ffa000"
					>
						<CookieRounded/>
					</TotalQuantityCard>
				</Grid>

				<Grid item xs={12} md={4}>
					<TotalQuantityCard
						title="Usuários"
						quantity={39}
						iconColor="#0097a7"
					>
						<PeopleAltRounded/>
					</TotalQuantityCard>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item md={12} lg={6}>
					<TotalPricesOfOrdersPerYearChart ordersTotalPricePerYearData={ordersTotalPricePerYearData} />
				</Grid>
				
				<Grid item md={12} lg={6}>
					<TotalQuantityOfOrdersPerYearChart ordersQuantityPerYearData={ordersQuantityPerYearData} />
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item md={12} lg={6}>
					<TotalPricesOfOrdersPerMonthChart
						ordersTotalPricePerMonthData={ordersTotalPricePerMonthData}
						dateChoice={dateChoiceOfOrdersTotalPricePerMonthData}
						setDateChoice={setDateChoiceOfOrdersTotalPricePerMonthData}
						setIsFetchOrders={setIsFetchOrdersTotalPricePerMonthData}
					/>
				</Grid>
				
				<Grid item xs={12} md={6}>
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
						<Typography variant="h6" sx={{ mb: 1, }}>Quantidade total de pedidos por mês</Typography>
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
				</Grid>
			</Grid>
		</Grid>
	);
};