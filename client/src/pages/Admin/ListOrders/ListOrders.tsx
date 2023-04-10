import { Box, Grid, Checkbox, Typography } from '@mui/material';
import { EditRounded, ExitToAppRounded } from '@mui/icons-material';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { MainButton } from '../../../components/MainButton';
import { useTitle } from '../../../utils/hooks/useTitle';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import ProductType from '../../../types/Product/ProductType';
import { clearRequest as clearRequestAction, findAllOrders as findAllOrdersAction } from '../../../store/features/orders/orders.actions';
import { findAllByIds as findAllProductsByIdsAction } from '../../../store/features/products/products.actions';
import { enqueueSnackbar } from 'notistack';
import PaginationModelType from '../../../types/PaginationModelType';
import brlCurrencyFormatter from '../../../utils/brlCurrencyFormatter';
import getTotalPriceOfOrder from '../../../utils/getTotalPriceOfOrder';
import getTotalQuantityOfOrder from '../../../utils/getTotalQuantityOfOrder';
import OrderType from '../../../types/Order/OrderType';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 40,
		flex: 1,
	},
	{
		field: 'user',
		headerName: 'Usuário',
		width: 100,
		flex: 1,
		renderCell: (params) => (
			<LinkUnstyled to={RoutesEnum.ADMIN_USER + params.row.user.id} sx={(theme): object => ({
				color: theme.palette.primary.darker + ' !important',
				'&:hover': {
					color: theme.palette.secondary.main + ' !important',
				},
			})}>
				{params.row.user.name}
			</LinkUnstyled>
		),
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
		minWidth: 220,
		sortable: false,
		flex: 1,
	},
	{
		field: 'totalQuantity',
		headerName: 'Quantidade total',
		description: 'Quantidade total de produtos',
		minWidth: 130,
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
		minWidth: 180,
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
			<LinkUnstyled to={RoutesEnum.ADMIN_ORDER + params.row.id}>
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

export const ListOrders: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [loading, setLoading] = useState(false);

	const [paginationModel, setPaginationModel] = useState<PaginationModelType>({
		page: 0,
		pageSize: 5,
		sort: undefined,
	});

	const [rows, setRows] = useState<ProductType[]>([]);
	const [responseJson, setResponseJson] = useState<any>({});

	const fetchOrders = async (): Promise<void> => {
		setLoading(true);

		const actionResponse = await findAllOrdersAction(paginationModel);
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
			const productsRequest = await findAllProductsByIdsAction(json.orders.flatMap(order => order.orderProducts.map(orderProduct => orderProduct.productId)));
			
			if (productsRequest[0].status === 500) {
				enqueueSnackbar(productsRequest[1].message, { variant: 'error', });
				setLoading(false);
				return;
			}

			json.orders.map(order => {
				order.createdAt = dayjs(order.createdAt).format('DD/MM/YYYY - HH:mm:ss').toString();
				order.products = order.orderProducts.map(orderProduct => productsRequest[1].products.find(p => p.id === orderProduct.productId).name).join(', ');
			}) as OrderType[];

			setRows(json.orders);
		}

		setLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useEffect(() => {
		fetchOrders();
	}, [paginationModel]);

	useTitle('Admin - Pedidos');

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<Grid display="flex" flexWrap="wrap" alignItems="center" gap={2}> 
				<Grid display="flex" flexDirection="column" justifyContent="center" flexGrow={1}>
					<Typography variant="h4">Pedidos</Typography>
					<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[700], })}>{responseJson.totalRows || 0} pedidos encontrados</Typography>
				</Grid>
			</Grid>

			<Box sx={{ flexGrow: 1, overflowX: 'auto', width: '100%', }}>
				<DataGrid
					autoHeight
					loading={loading}
					rows={rows}
					columns={columns}
					rowCount={responseJson.totalRows}
					rowHeight={110}
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
						'& *': {
							overflowX: 'hidden !important',
						},
						minWidth: '950px',
						transition: 'all 0s',
					}}
				/>
			</Box>
		</Grid>
	);
};