import { Box, Grid, Checkbox, Typography } from '@mui/material';
import { ExitToAppRounded, WhatsApp } from '@mui/icons-material';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { useTitle } from '../../../utils/hooks/useTitle';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import ProductType from '../../../types/Product/ProductType';
import { clearRequest as clearRequestAction, findAllUsers as findAllUsersAction } from '../../../store/features/users/users.actions';
import { enqueueSnackbar } from 'notistack';
import PaginationModelType from '../../../types/PaginationModelType';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 40,
		flex: 1,
	},
	{
		field: 'name',
		headerName: 'Nome',
		minWidth: 250,
		flex: 1,
	},
	{
		field: 'email',
		headerName: 'Email',
		minWidth: 300,
		flex: 1,
	},
	{
		field: 'phone',
		headerName: 'Telefone',
		maxWidth: 180,
		flex: 1,
		renderCell: (params) => (
			<React.Fragment>
				{params.row.phone}
				<LinkUnstyled to={`https://wa.me/55${
					params.row.phone
						.replaceAll(' ', '')
						.replaceAll('(', '')
						.replaceAll(')', '')
						.replaceAll('-', '')
				}`} target="_blank" sx={{
					ml: 'auto',
					color: '#128C7E !important',
					'&:hover': {
						color: '#075E54 !important',
					},
					transition: 'all .25s',
				}}>
					<WhatsApp/>
				</LinkUnstyled>
			</React.Fragment>
		),
	},
	{
		field: 'isAdmin',
		headerName: 'Administrador',
		minWidth: 130,
		headerAlign: 'center',
		align: 'center',
		flex: 1,
		renderCell: (params) => <Checkbox disabled checked={params.row.isAdmin} sx={(theme): object => ({ color: theme.palette.primary.dark + ' !important', })}/>,
	},
	{
		field: 'createdAt',
		headerName: 'Data de registro',
		minWidth: 180,
		flex: 1,
		renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY - HH:mm:ss').toString(),
	}
];

export const ListUsers: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [loading, setLoading] = useState(false);

	const [paginationModel, setPaginationModel] = useState<PaginationModelType>({
		page: 0,
		pageSize: 5,
		sort: undefined,
	});

	const [rows, setRows] = useState<ProductType[]>([]);
	const [responseJson, setResponseJson] = useState<any>({});

	const fetchUsers = async (): Promise<void> => {
		setLoading(true);

		const [response, json] = await findAllUsersAction(paginationModel);

		setResponseJson(json);

		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}

		if (json.users)
			setRows(json.users);

		setLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [paginationModel]);

	useTitle('Admin - Usuários');

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<Grid display="flex" flexWrap="wrap" alignItems="center" gap={2}> 
				<Grid display="flex" flexDirection="column" justifyContent="center" flexGrow={1}>
					<Typography variant="h4">Usuários</Typography>
					<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[700], })}>{responseJson.totalRows || 0} usuários encontrados</Typography>
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
						minWidth: '1100px',
						transition: 'all 0s',
					}}
				/>
			</Box>
		</Grid>
	);
};