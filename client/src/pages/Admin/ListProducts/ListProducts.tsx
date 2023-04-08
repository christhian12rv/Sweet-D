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
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import ProductType from '../../../types/Product/ProductType';
import { clearRequest as clearRequestAction, findAllProducts as findAllProductsAction } from '../../../store/features/products/products.actions';
import { enqueueSnackbar } from 'notistack';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 90,
		flex: 1,
	},
	{
		field: 'photos',
		headerName: '',
		minWidth: 100,
		flex: 1,
		renderCell: (params) => (
			<Box component="div" sx={{
				backgroundImage: `url(${params.row.photos[0].url})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				borderRadius: '8px',
				width: '90px',
				height: '90px',
			}}/>
		),
	},
	{
		field: 'name',
		headerName: 'Nome',
		minWidth: 120,
		flex: 1,
	},
	{
		field: 'slug',
		headerName: 'Slug',
		minWidth: 120,
		flex: 1,
	},
	{
		field: 'prices',
		headerName: 'Preços',
		description: 'Preço de cada tamanho',
		sortable: false,
		minWidth: 200,
		flex: 1,
		renderCell: (params) => params.row.sizes.map(s => s.price).join(', '),
	},
	{
		field: 'active',
		headerName: 'Ativo',
		width: 140,
		flex: 1,
		renderCell: (params) => <Checkbox disabled checked={params.row.active} sx={(theme): object => ({ color: theme.palette.primary.dark + ' !important', })}/>,
	},
	{
		field: 'createdAt',
		headerName: 'Criado em',
		minWidth: 200,
		flex: 1,
	},
	{
		field: 'Ações',
		headerName: '',
		width: 90,
		sortable: false,
		filterable: false,
		renderCell: (params) => (
			<Grid display="flex" alignItems="center" justifyContent="center" gap="12px" width="100%" sx={{ overflowX: 'hidden', }}>
				<LinkUnstyled to={RoutesEnum.ADMIN_PRODUCT + params.row.slug}>
					<EditRounded className="action-icon" sx={(theme): object => ({
						'&:hover': {
							color: theme.palette.primary.dark,
						},
						transition: 'all .25s',
					})}/>
				</LinkUnstyled>

				<LinkUnstyled to={RoutesEnum.PRODUCT + params.row.slug}>
					<ExitToAppRounded className="action-icon" sx={(theme): object => ({
						'&:hover': {
							color: theme.palette.primary.dark,
						},
						transition: 'all .25s',
					})}/>
				</LinkUnstyled>
			</Grid>
		),
	}
];

const rows = [
	{ id: 1, name: 'Bolo de pote', slug: 'bolo-de-pote', prices: 'R$ 9,00 , R$ 11,00', active: true, createdAt: dayjs(new Date()).format('DD/MM/YYYY - HH:mm:ss').toString(), }
];

export const ListProducts: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [loading, setLoading] = useState(false);
	const { request, previousType, } = useTypedSelector((state) => state.products);

	const [rows, setRows] = useState<ProductType[]>([]);

	const fetchProducts = async (): Promise<void> => {
		setLoading(true);

		const [response, json] = await findAllProductsAction();

		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}

		if (json.products) {
			json.products.map(product => {
				product.createdAt = dayjs(product.createdAt).format('DD/MM/YYYY - HH:mm:ss').toString();
				product.photos = JSON.parse(product.photos);
			}) as ProductType[];
			setRows(json.products);
		}

		
		setLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
		fetchProducts();
	}, []);

	useEffect(() => {

		console.log(rows);
	}, [rows]);

	useTitle('Admin - Produtos');

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<Grid display="flex" flexWrap="wrap" alignItems="center" gap={2}> 
				<Grid display="flex" flexDirection="column" justifyContent="center" flexGrow={1}>
					<Typography variant="h4">Produtos</Typography>
					<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[700], })}>38 produtos encontrados</Typography>
				</Grid>
				<LinkUnstyled to={RoutesEnum.ADMIN_ADD_PRODUCT}>
					<MainButton style={{ alignSelf: 'flex-start', width: 'fit-content', }}>Adicionar Produto</MainButton>
				</LinkUnstyled>
			</Grid>

			<Box sx={{ flexGrow: 1, overflowX: 'auto', width: '100%', }}>
				<DataGrid
					loading={loading}
					rows={rows}
					columns={columns}
					rowHeight={110}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
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
						minHeight: '500px',
						minWidth: '950px',
						transition: 'all 0s',
					}}
				/>
			</Box>
		</Grid>
	);
};