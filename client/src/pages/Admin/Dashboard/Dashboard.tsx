import { AttachMoneyRounded, CookieRounded, PeopleAltRounded, ReceiptLongRounded } from '@mui/icons-material';
import { Box, Grid,  Paper,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  Typography } from '@mui/material';
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
import { useNonInitialEffect } from '../../../utils/hooks/useNonInitialEffect';
import { TotalQuantityOfOrdersPerMonthChart } from './TotalQuantityOfOrdersPerMonthChart';
import brlCurrencyFormatter from '../../../utils/brlCurrencyFormatter';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import RoutesEnum from '../../../types/enums/RoutesEnum';

type TopSellingProduct = {
	id: number;
	name: string;
	photo: {
		public_id: string;
		url: string;
	};
	slug: string;
	quantitySold: number;
}

type DashboardResult = {
	totalPriceOrders: number;
	totalQuantityOrders: number;
	totalQuantityProducts: number;
	totalQuantityUsers: number;
	topSellingProducts: TopSellingProduct[];
}

type DataTotalPricePerMonth = {
	name: number;
	totalPrice: number;
};

type DataQuantityPerMonth = {
	name: number;
	quantity: number;
};

type OrdersPerMonthReturn = {
	dataTotalPricePerMonth: DataTotalPricePerMonth[];
	dataQuantityPerMonth: DataQuantityPerMonth[];
}

export const Dashboard: React.FunctionComponent = () => {
	const [loading, setLoading] = useState(true);

	const [dashboard, setDashboard] = useState<DashboardResult>({
		totalPriceOrders: 0,
		totalQuantityOrders: 0,
		totalQuantityProducts: 0,
		totalQuantityUsers: 0,
		topSellingProducts: [],
	});

	const [ordersQuantityPerYearData, setOrdersQuantiyPerYearData] = useState<{
		name: string;
		quantity: number;
	}[]>([]);
	const [ordersTotalPricePerYearData, setOrdersTotalPricePerYearData] = useState<{
		name: string;
		totalPrice: number;
	}[]>([]);
	
	const [dateChoiceOfOrdersTotalPricePerMonthData, setDateChoiceOfOrdersTotalPricePerMonthData] = useState(dayjs());
	const [ordersTotalPricePerMonthData, setOrdersTotalPricePerMonthData] = useState<DataTotalPricePerMonth[]>([]);
	const [isFetchOrdersTotalPricePerMonthData, setIsFetchOrdersTotalPricePerMonthData] = useState(false);

	const [dateChoiceOfOrdersQuantityPerMonthData, setDateChoiceOfOrdersQuantityPerMonthData] = useState(dayjs());
	const [ordersQuantityPerMonthData, setOrdersQuantityPerMonthData] = useState<DataQuantityPerMonth[]>([]);
	const [isFetchOrdersQuantityPerMonthData, setIsFetchOrdersQuantityPerMonthData] = useState(false);
	
	const getDashboardChartsData = async (orders): Promise<OrdersPerMonthReturn> => {
		const dataTotalPricePerMonth: DataTotalPricePerMonth[] = [];
		const dataQuantityPerMonth: DataQuantityPerMonth[] = [];

		for (let i = 1; i <= daysOfEachMonthArray[dateChoiceOfOrdersTotalPricePerMonthData.get('month')]; i++) {
			let totalPriceOfDay = 0;
			let quantityOfDay = 0;

			orders.filter(o => dayjs(o.createdAt).get('date') === i)
				.forEach(o => {
					o.orderProducts.forEach((orderProduct) => {
						let totalPriceOfProduct = orderProduct.sizePrice;
						
						orderProduct.orderProductIngredients.forEach((orderProductIngredients) => {
							totalPriceOfProduct += orderProductIngredients.price;
						});

						totalPriceOfProduct *= orderProduct.quantity;
						totalPriceOfDay += totalPriceOfProduct;
					});

					quantityOfDay++;
				}),

			dataTotalPricePerMonth.push({
				name: i,
				totalPrice: totalPriceOfDay,
			});

			dataQuantityPerMonth.push({
				name: i,
				quantity: quantityOfDay,
			});
		}
		
		return {
			dataTotalPricePerMonth,
			dataQuantityPerMonth,
		};
	};

	const fetchTotalPriceOrdersPerMonth = async (): Promise<void> => {
		const findAllOrdersByYearAndMonthActionResponse = await findAllOrdersByYearAndMonthAction(
			dateChoiceOfOrdersTotalPricePerMonthData.get('year'), dateChoiceOfOrdersTotalPricePerMonthData.get('month')
		);

		const { dataTotalPricePerMonth, } = await getDashboardChartsData(findAllOrdersByYearAndMonthActionResponse[1].orders);

		setOrdersTotalPricePerMonthData(dataTotalPricePerMonth);
	};

	const fetchQuantityOrdersPerMonth = async (): Promise<void> => {
		const findAllOrdersByYearAndMonthActionResponse = await findAllOrdersByYearAndMonthAction(
			dateChoiceOfOrdersQuantityPerMonthData.get('year'), dateChoiceOfOrdersQuantityPerMonthData.get('month')
		);

		const { dataQuantityPerMonth, } = await getDashboardChartsData(findAllOrdersByYearAndMonthActionResponse[1].orders);
		
		setOrdersQuantityPerMonthData(dataQuantityPerMonth);
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

		setDashboard({
			totalPriceOrders: json.totalPriceOrders,
			totalQuantityOrders: json.totalQuantityOrders,
			totalQuantityProducts: json.totalQuantityProducts,
			totalQuantityUsers: json.totalQuantityUsers,
			topSellingProducts: json.topSellingProducts,
		});

		fetchTotalPriceOrdersPerMonth();
		fetchQuantityOrdersPerMonth();

		setLoading(false);
	};

	useEffect(() => {
		fetchDashboard();
	}, []);

	useNonInitialEffect(() => {
		if (!isFetchOrdersTotalPricePerMonthData)
			return;

		setIsFetchOrdersTotalPricePerMonthData(false);
		fetchTotalPriceOrdersPerMonth();
	}, [isFetchOrdersTotalPricePerMonthData]);

	useNonInitialEffect(() => {
		if (!isFetchOrdersQuantityPerMonthData)
			return;

		setIsFetchOrdersQuantityPerMonthData(false);
		fetchQuantityOrdersPerMonth();
	}, [isFetchOrdersQuantityPerMonthData]);

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<Typography variant="h4">Dashboard</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12} md={3}>
					<TotalQuantityCard
						title="Total de Pedidos"
						value={dashboard.totalQuantityOrders}
						iconColor="#536dfe"
					>
						<ReceiptLongRounded/>
					</TotalQuantityCard>
				</Grid>

				<Grid item xs={12} md={3}>
					<TotalQuantityCard
						title="Renda Total"
						value={brlCurrencyFormatter.format(dashboard.totalPriceOrders)}
						iconColor="#536dfe"
					>
						<AttachMoneyRounded/>
					</TotalQuantityCard>
				</Grid>

				<Grid item xs={12} md={3}>
					<TotalQuantityCard
						title="Produtos"
						value={dashboard.totalQuantityProducts}
						iconColor="#ffa000"
					>
						<CookieRounded/>
					</TotalQuantityCard>
				</Grid>

				<Grid item xs={12} md={3}>
					<TotalQuantityCard
						title="Usuários"
						value={dashboard.totalQuantityUsers}
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
				
				<Grid item xs={12} lg={6}>
					<TotalQuantityOfOrdersPerMonthChart
						ordersQuantityPerMonthData={ordersQuantityPerMonthData}
						dateChoice={dateChoiceOfOrdersQuantityPerMonthData}
						setDateChoice={setDateChoiceOfOrdersQuantityPerMonthData}
						setIsFetchOrders={setIsFetchOrdersQuantityPerMonthData}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} lg={6}>
					<Box sx={{
						boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
						border: 'none',
						p: 3,
					}}>
						<Typography variant="h6" sx={{ mb: 1, }}>Produtos mais vendidos</Typography>
						<TableContainer >
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>Produto</TableCell>
										<TableCell>Vendas</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{dashboard.topSellingProducts.map((topSellingProduct) => (
										<TableRow
											key={topSellingProduct.id}
											sx={{ '&:last-child td, &:last-child th': { border: 0, }, }}
										>
											<TableCell component="th" scope="row">
												{topSellingProduct.id}
											</TableCell>
											<TableCell>
												<LinkUnstyled to={RoutesEnum.ADMIN_PRODUCT + topSellingProduct.slug} sx={(theme): object => ({
													'&:hover': {
														color: theme.palette.primary.darker + '!important',
													},
													transition: 'all .25s',
												})}>
													<Grid display="flex" alignItems="center" gap={2}>
														<Box component="div" sx={{
															backgroundImage: `url(${topSellingProduct.photo.url})`,
															backgroundSize: 'cover',
															backgroundPosition: 'center',
															borderRadius: '8px',
															minWidth: '60px',
															width: '60px',
															height: '60px',
														}}/>
														{topSellingProduct.name}
													</Grid>
												</LinkUnstyled>
											</TableCell>
											<TableCell>{topSellingProduct.quantitySold}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
};