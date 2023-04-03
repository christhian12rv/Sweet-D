import { ExitToAppRounded } from '@mui/icons-material';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, ptBR } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import RoutesEnum from '../../types/enums/RoutesEnum';
import ScreenSizeQuerysEnum from '../../types/enums/ScreenSizeQuerysEnum';
import brlCurrencyFormatter from '../../utils/brlCurrencyFormatter';
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

const rows = [
	{ id: 1, total: brlCurrencyFormatter.format(24.90), products: 'Bolo de pote, Cookie de chocolate, Bolo de Cenoura', finished: true, totalQuantity: 35, createdAt: dayjs(new Date()).format('DD/MM/YYYY - HH:mm:ss').toString(), }
];

export const Orders: React.FunctionComponent = () => {

	useTitle('Meus Pedidos');

	return (
		<Grid display="flex" flexDirection="column" sx={{ maxWidth: ScreenSizeQuerysEnum.MOBILE, }}>
			<Typography variant="h4" mb={3}>Meus pedidos</Typography>

			<Box sx={{ overflowX: 'auto', }}>
				<DataGrid
					rows={rows}
					columns={columns}
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
						minHeight: '500px',
						minWidth: '700px',
						transition: 'all 0s',
					}}
				/>
			</Box>
			
		</Grid>
	);
};