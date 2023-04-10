import { ExitToAppRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Box, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import RoutesEnum from '../../types/enums/RoutesEnum';
import brlCurrencyFormatter from '../../utils/brlCurrencyFormatter';
import { findById as findOrderByIdAction } from '../../store/features/orders/orders.actions';
import { findAllByIds as findAllProductsByIdsAction } from '../../store/features/products/products.actions';
import PotCakeImg from '../../assets/img/bolo-pote-chocolate.jpg';
import { useTitle } from '../../utils/hooks/useTitle';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import OrderType from '../../types/Order/OrderType';
import { useParams } from 'react-router-dom';
import getTotalPriceOfProduct from '../../utils/getTotalPriceOfProduct';

type IngredientsType = {
	type: string;
	ingredients: string[];
};

type Row = {
	id: number;
	photo: string;
	name: string;
	quantity: number;
	price: string;
	size: string;
	total: string;
	slug: string;
	ingredients: IngredientsType[];
};

type CustomTableRowProps = {
	row: Row;
}

const CustomTableRow: React.FunctionComponent<CustomTableRowProps> = ({ row, }) => {
	const [openRow, setOpenRow] = useState(false);

	return (
		<>
			<TableRow
				key={row.id}
				sx={{ '& > *': { borderBottom: 'unset !important', }, }}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={(): any => setOpenRow(!openRow)}
					>
						{openRow ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.id}
				</TableCell>
				<TableCell align="center">
					<LinkUnstyled to={RoutesEnum.PRODUCT + row.slug}>
						<Box component="div" sx={{
							backgroundImage: `url(${row.photo})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							borderRadius: '8px',
							width: '100px',
							height: '100px',
						}}/>
					</LinkUnstyled>
				</TableCell>
				<TableCell align="left">{row.name}</TableCell>
				<TableCell align="center">{row.quantity}</TableCell>
				<TableCell align="center">{row.price}</TableCell>
				<TableCell align="center">{row.size}</TableCell>
				<TableCell align="center">{row.total}</TableCell>
				<TableCell align="center">
					<LinkUnstyled to={RoutesEnum.PRODUCT + row.slug}>
						<ExitToAppRounded sx={(theme): object => ({
							'&:hover': {
								color: theme.palette.primary.dark,
							},
							transition: 'all .25s',
						})}/>
					</LinkUnstyled>
				</TableCell>
			</TableRow>

			<TableRow>
				<TableCell style={{ padding: 0, }} colSpan={12}>
					<Collapse in={openRow} timeout="auto" unmountOnExit>
						<Box sx={(theme): object => ({
							p: 2,
							backgroundColor: theme.palette.grey[100],
						})}>
							{row.ingredients.map(ingredient => (
								<Grid key={ingredient.type} display="flex" alignItems="center" gap={1}>
									<Typography variant="h6" sx={{
										fontSize: '1.3em',
									}}>{ingredient.type}:</Typography>
									<Typography variant="body1" sx={(theme): object => ({
										pt: '4px',
										color: theme.palette.grey[800],
									})}>{ingredient.ingredients.join(', ')}</Typography>
								</Grid>
							))}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export const Order: React.FunctionComponent = () => {
	const { id, } = useParams();

	if (!id)
		return <></>;

	const [rows, setRows] = useState<Row[]>([]);
	const [order, setOrder] = useState<{
		id: number;
		totalPrice: string;
		totalQuantity: number;
		date: string;
		finished: boolean;
		createdAt: string;
	} | null>(null);

	const [title, setTitle] = useTitle('Pedido #');
	const [loading, setLoading] = useState(true);

	const fetchOrder = async (): Promise<void> => {
		setLoading(true);

		const actionResponse = await findOrderByIdAction(Number(id));
		if (!actionResponse)
			return;

		const [response, json] = actionResponse;

		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}

		if (json.order) {
			setTitle(`Pedido #${json.order.id}`);

			const productsRequest = await findAllProductsByIdsAction(json.order.orderProducts.map(orderProduct => orderProduct.productId));
			
			if (productsRequest[0].status === 500) {
				enqueueSnackbar(productsRequest[1].message, { variant: 'error', });
				setLoading(false);
				return;
			}

			let totalPrice = 0;
			let totalQuantity = 0;

			const orderProducts: Row[] = json.order.orderProducts.map(orderProduct => {
				const ingredients: IngredientsType[] = [];
				orderProduct.orderProductIngredients.forEach((opi) => {
					const ingredientIndex = ingredients.findIndex(i => i.type === opi.type);

					if (ingredientIndex >= 0) {
						ingredients[ingredientIndex].ingredients.push(`${opi.name} (${brlCurrencyFormatter.format(opi.price)})`);
						return;
					}

					ingredients.push({
						type: opi.type,
						ingredients: [`${opi.name} (${brlCurrencyFormatter.format(opi.price)})`],
					});
				});

				const totalPriceOneProduct = orderProduct.sizePrice + orderProduct.orderProductIngredients.reduce((sum, opi) => sum + opi.price, 0);
				const totalOrderProduct = totalPriceOneProduct * orderProduct.quantity;

				totalPrice += totalOrderProduct;
				totalQuantity += orderProduct.quantity;

				return {
					id: orderProduct.id,
					name: productsRequest[1].products.find(p => p.id === orderProduct.productId).name,
					photo: JSON.parse(productsRequest[1].products.find(p => p.id === orderProduct.productId).photos)[0].url,
					quantity: orderProduct.quantity,
					price: brlCurrencyFormatter.format(totalPriceOneProduct),
					size: `${orderProduct.sizeName} (${brlCurrencyFormatter.format(orderProduct.sizePrice)})`,
					total: brlCurrencyFormatter.format(totalOrderProduct),
					slug: productsRequest[1].products.find(p => p.id === orderProduct.productId).slug,
					ingredients,
				};
			});

			setOrder({
				id: json.order.id,
				totalPrice: brlCurrencyFormatter.format(totalPrice),
				totalQuantity,
				date: json.order.date,
				finished: json.order.finished,
				createdAt: json.order.createdAt,
			});
			setRows(orderProducts);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchOrder();
	}, []);

	return (
		<Grid display="flex" flexDirection="column">
			<Typography variant="h4">Detalhes do Pedido</Typography>
			<Typography variant="body1" sx={(theme): object => ({ fontSize: '1.1em', color: theme.palette.grey[600], })}>Número do pedido: #{order?.id}</Typography>
			<Grid display="flex" alignItems="center">
				<Typography variant="body1" sx={{ fontSize: '1.2em', }}>Total:</Typography>
				<Typography variant="body1" sx={(theme): object => ({ fontSize: '1.2em', color: theme.palette.primary.darker, })}>
				&nbsp;{order?.totalPrice}
				</Typography>
			</Grid>
			<Typography variant="body1" sx={{ fontSize: '1.2em', }}>Quantidade de produtos: {order?.totalQuantity}</Typography>
			<Typography variant="body1" sx={{ fontSize: '1.2em', }}>Data: {order ? dayjs(order?.createdAt).format('DD/MM/YYYY - HH:mm:ss').toString() : ''}</Typography>
			<Typography variant="body1" sx={(theme): object => ({ fontSize: '1.2em', color: theme.palette.primary.darker, })}>Data de entrega:
				&nbsp;{order ? dayjs(order.date).format('DD/MM/YYYY - HH:mm:ss').toString() : ''}
			</Typography>
			<Typography variant="body1" sx={{ mb: 5, fontSize: '1.2em', }}>Status:
				<Box component="span" sx={{ color: order?.finished ? '#00C853' : '#FFA000', }}>
				&nbsp;{order ? (order.finished ? 'Finalizado' : 'Em andamento') : ''}
				</Box>
			</Typography>

			<TableContainer sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', }} >
				<Table sx={{ minWidth: 650, }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell/>
							<TableCell>ID</TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="left">Nome</TableCell>
							<TableCell align="center">Quantidade</TableCell>
							<TableCell align="center">Preço</TableCell>
							<TableCell align="center">Tamanho</TableCell>
							<TableCell align="center">Total</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<CustomTableRow key={row.id} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};