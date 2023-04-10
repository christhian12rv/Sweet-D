import { ExitToAppRounded } from '@mui/icons-material';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { findOrdersByLoggedUser as findOrdersByLoggedUserAction } from '../../store/features/orders/orders.actions';
import { findAllByIds as findAllProductsByIdsAction } from '../../store/features/products/products.actions';
import RoutesEnum from '../../types/enums/RoutesEnum';
import ScreenSizeQuerysEnum from '../../types/enums/ScreenSizeQuerysEnum';
import OrderType from '../../types/Order/OrderType';
import PaginationModelType from '../../types/PaginationModelType';
import brlCurrencyFormatter from '../../utils/brlCurrencyFormatter';
import getTotalPriceOfOrder from '../../utils/getTotalPriceOfOrder';
import getTotalQuantityOfOrder from '../../utils/getTotalQuantityOfOrder';
import { useTitle } from '../../utils/hooks/useTitle';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 90,
		flex: 1,
	},
	{
		field: 'total',
		headerName: 'Total',
		minWidth: 90,
		align: 'center',
		headerAlign: 'center',
		flex: 1,
		renderCell: (params) => brlCurrencyFormatter.format(getTotalPriceOfOrder(params.row.orderProducts)),
	},
	{
		field: 'products',
		headerName: 'Produtos',
		minWidth: 170,
		sortable: false,
		flex: 1,
	},
	{
		field: 'totalQuantity',
		headerName: 'Quantidade total',
		description: 'Quantidade total de produtos',
		minWidth: 90,
		align: 'center',
		headerAlign: 'center',
		flex: 1,
		renderCell: (params) => getTotalQuantityOfOrder(params.row.orderProducts),
	},
	{
		field: 'finished',
		headerName: 'Finalizado',
		width: 140,
		align: 'center',
		headerAlign: 'center',
		flex: 1,
		renderCell: (params) => <Checkbox disabled checked={params.row.finished} sx={(theme): object => ({ color: theme.palette.primary.dark + ' !important', })}/>,
	},
	{
		field: 'createdAt',
		headerName: 'Data',
		description: 'Data do pedido',
		minWidth: 170,
		flex: 1,
	},
	{
		field: 'Ações',
		headerName: '',
		width: 50,
		align: 'center',
		sortable: false,
		filterable: false,
		renderCell: (params) => (
			<LinkUnstyled to={RoutesEnum.ORDER + params.row.id}>
				<ExitToAppRounded sx={(theme): object => ({
					'&:hover': {
						color: theme.palette.primary.dark,
					},
					transition: 'all .25s',
				})}/>
			</LinkUnstyled>
		),
	}
];

export const Orders: React.FunctionComponent = () => {
	const [loading, setLoading] = useState(true);
	
	const [paginationModel, setPaginationModel] = useState<PaginationModelType>({
		page: 0,
		pageSize: 5,
		sort: undefined,
	});
	
	const [rows, setRows] = useState<OrderType[]>([]);
	const [responseJson, setResponseJson] = useState<any>({});
	
	useTitle('Meus Pedidos');

	const fetchOrders = async (): Promise<void> => {
		setLoading(true);

		const actionResponse = await findOrdersByLoggedUserAction(paginationModel);
		if (!actionResponse)
			return;

		const [response, json] = actionResponse;

		setResponseJson(json);

		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}

		if (json.orders) {
			console.log(json.orders);
			const productsRequest = await findAllProductsByIdsAction(json.orders.flatMap(order => order.orderProducts.map(orderProduct => orderProduct.productId)));
			
			if (productsRequest[0].status === 500) {
				enqueueSnackbar(productsRequest[1].message, { variant: 'error', });
				setLoading(false);
				return;
			}

			json.orders.map(order => {
				order.createdAt = dayjs(order.createdAt).format('DD/MM/YYYY - HH:mm:ss').toString();
				order.products = order.orderProducts.map(orderProduct => productsRequest[1].products.find(p => p.id === orderProduct.productId).name);
			}) as OrderType[];

			setRows(json.orders);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchOrders();
	}, [paginationModel]);

	return (
		<Grid display="flex" flexDirection="column" sx={{ maxWidth: ScreenSizeQuerysEnum.MOBILE, }}>
			<Typography variant="h4" mb={3}>Meus pedidos</Typography>

			<Box sx={{ overflowX: 'auto', }}>
				<DataGrid
					loading={loading}
					rows={rows}
					columns={columns}
					rowCount={responseJson.totalRows}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5, 10, 25, 50]}
					paginationMode="server"
					paginationModel={paginationModel}
					onPaginationModelChange={(model): void => {
						setPaginationModel({ ...paginationModel, ...model, });
					}}
					onSortModelChange={(model): void => {
						setPaginationModel({ ...paginationModel, sort: { ...model[0], }, });
					}}
					disableRowSelectionOnClick
					disableColumnFilter
					localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
					sx={{
						'& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader': {
							outline: 'none !important',
						},
						minHeight: '500px',
						minWidth: '700px',
						transition: 'all 0s',
					}}
				/>
			</Box>
			
		</Grid>
	);
};