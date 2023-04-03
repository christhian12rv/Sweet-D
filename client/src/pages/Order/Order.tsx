import { ExitToAppRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Box, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Collapse } from '@mui/material';
import React from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import RoutesEnum from '../../types/enums/RoutesEnum';
import brlCurrencyFormatter from '../../utils/brlCurrencyFormatter';
import PotCakeImg from '../../assets/img/bolo-pote-chocolate.jpg';
import { useTitle } from '../../utils/hooks/useTitle';

type Row = {
	id: number;
	name: string;
	quantity: number;
	price: string;
	size: string;
	total: string;
	slug: string;
	ingredients: {
		pastas: string[];
		fillings: string[];
	};
};

const rows: Row[] = [
	{
		id: 2,
		name: 'Bolo de pote',
		quantity: 2,
		price: brlCurrencyFormatter.format(8),
		total: brlCurrencyFormatter.format(2 * 8),
		size: '250ml',
		slug: 'bolo-pote',
		ingredients: {
			pastas: ['Chocolate', 'Baunilha'],
			fillings: ['Abacaxi', 'Ninho'],
		},
	},
	{
		id: 2,
		name: 'Bolo de pote',
		quantity: 2,
		price: brlCurrencyFormatter.format(8),
		total: brlCurrencyFormatter.format(2 * 8),
		size: '250ml',
		slug: 'bolo-pote',
		ingredients: {
			pastas: ['Chocolate', 'Baunilha'],
			fillings: ['Abacaxi', 'Ninho'],
		},
	}
];

type CustomTableRowProps = {
	row: Row;
}

const CustomTableRow: React.FunctionComponent<CustomTableRowProps> = ({ row, }) => {
	const [openRow, setOpenRow] = React.useState(false);

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
					<Box component="div" sx={{
						backgroundImage: `url(${PotCakeImg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						borderRadius: '8px',
						width: '100px',
						height: '100px',
					}}/>
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
							<Grid display="flex" alignItems="center" gap={1}>
								<Typography variant="h6" sx={{
									fontSize: '1.3em',
								}}>Massas:</Typography>
								<Typography variant="body1" sx={(theme): object => ({
									pt: '4px',
									color: theme.palette.grey[800],
								})}>{row.ingredients.pastas.join(', ')}</Typography>
							</Grid>
							<Grid display="flex" alignItems="center" gap={1}>
								<Typography variant="h6" sx={{
									fontSize: '1.3em',
								}}>Recheios:</Typography>
								<Typography variant="body1" sx={(theme): object => ({
									pt: '3px',
									color: theme.palette.grey[800],
								})}>{row.ingredients.fillings.join(', ')}</Typography>
							</Grid>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export const Order: React.FunctionComponent = () => {

	useTitle('Pedido #');

	return (
		<Grid display="flex" flexDirection="column">
			<Typography variant="h4">Detalhes do Pedido</Typography>
			<Typography variant="body1" sx={(theme): object => ({ fontSize: '1.1em', color: theme.palette.grey[600], })}>Número do pedido: #3213</Typography>
			<Grid display="flex" alignItems="center">
				<Typography variant="body1" sx={{ fontSize: '1.2em', }}>Total:</Typography>
				<Typography variant="body1" sx={(theme): object => ({ fontSize: '1.2em', color: theme.palette.primary.dark, })}>
				&nbsp;R$ 37,90
				</Typography>
			</Grid>
			
			<Typography variant="body1" sx={{ fontSize: '1.2em', }}>Quantidade de produtos: 2</Typography>
			<Typography variant="body1" sx={{ fontSize: '1.2em', }}>Data: 23/03/2023 - 10:00:00</Typography>
			<Typography variant="body1" sx={{ mb: 5, fontSize: '1.2em', }}>Status:
				<Box component="span" sx={{ color: '#00C853', }}>
				&nbsp;Finalizado
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