import { Dialog, Grid, Typography, TextField, MenuItem, Box, Checkbox, Snackbar, Alert, Divider } from '@mui/material';
import React, { useState } from 'react';
import { MainButton } from '../../../../../components/MainButton';
import { BoxDialog, CloseDialogIcon, FormControlStyled } from './EditItem.styled';

const itemPastasArray = [
	{
		label: 'Chocolate',
		value: 'Chocolate',
		price: '0,00',
	},
	{
		label: 'Baunilha',
		value: 'Baunilha',
		price: '0,00',
	},
	{
		label: 'Misto',
		value: 'Misto',
		price: '0,00',
	}
];

const itemFillingsArray = [
	{
		label: 'Abacaxi',
		value: 'Abacaxi',
		price: '2,00',
	},
	{
		label: 'Ninho',
		value: 'Ninho',
		price: '2,00',
	},
	{
		label: 'Morango',
		value: 'Morango',
		price: '3,00',
	}
];

const itemSizesArray = ['250ml', '500ml'];

type Props = {
	openEditItemDialog: boolean;
	setOpenEditItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditItem: React.FunctionComponent<Props> = ({ openEditItemDialog, setOpenEditItemDialog, }) => {
	const [itemPastas, setItemPastas] = useState<string[]>([]);
	const [itemFillings, setItemFillings] = useState<string[]>([]);
	const [openItemPastasSnackbar, setOpenItemPastasSnackbar] = useState(false);
	const [openItemFillingsSnackbar, setOpenItemFillingsSnackbar] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState('');
	

	const handleCloseEditItemDialog = (): void => {
		setOpenEditItemDialog(false);
	};

	const handleChangeItemPastas = (event): void => {
		if (event.target.value.length >= 3) {
			handleChangeOpenItemPastasSnackbar(true);
			return;
		}

		setItemPastas(event.target.value);
	};

	const handleChangeItemFillings = (event): void => {
		if (event.target.value.length >= 3) {
			handleChangeOpenItemFillingsSnackbar(true);
			return;
		}

		setItemFillings(event.target.value);
	};

	const handleChangeOpenItemPastasSnackbar = (value): void => {
		setOpenItemPastasSnackbar(value);
	};

	const handleChangeOpenItemFillingsSnackbar = (value): void => {
		setOpenItemFillingsSnackbar(value);
	};

	const handleChangeQuantity = (event): void => {
		setQuantity(Number(event.target.value));
	};

	const handleChangeSize = (event): void => {
		setSize(event.target.value);
	};

	return (
		<Dialog
			open={openEditItemDialog}
			onClose={handleCloseEditItemDialog}
		>
			<BoxDialog>
				<Grid display="flex" alignItems="center" justifyContent="center" mb="1em">
					<Typography variant="h6" component="h2" mx="auto">
								Escolha os ingredientes
					</Typography>
					<CloseDialogIcon onClick={handleCloseEditItemDialog}/>
				</Grid>

				<FormControlStyled>
					<Typography sx={{ mb: 1, }}>Massas</Typography>
					<TextField
						fullWidth
						select
						SelectProps={{
							multiple: true,
							value: itemPastas,
							onChange: handleChangeItemPastas,
							renderValue: (selected: any): any => selected ? selected.join(', ') : '',
						}}
						label="Massas"
					>
						{itemPastasArray.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								<Checkbox sx={{ py: 0, }} checked={itemPastas.includes(option.value)} />
								<Box component="span" sx={{ flexGrow: 1, }}>
									{option.label}
								</Box>
								<Box component="span">
										+ R$ {option.price}
								</Box>
							</MenuItem>
						))}
					</TextField>
					<Snackbar
						open={openItemPastasSnackbar}
						autoHideDuration={6000}
						onClose={(): any => handleChangeOpenItemPastasSnackbar(false)}
						anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
					>
						<Alert onClose={(): any => handleChangeOpenItemPastasSnackbar(false)} severity="error" sx={{ width: '100%', }}>
								Você só pode escolher no máximo 2 massas
						</Alert>
					</Snackbar>

					<Typography sx={{ mb: 1, mt: 2, }}>Recheios</Typography>
					<TextField
						fullWidth
						select
						SelectProps={{
							multiple: true,
							value: itemFillings,
							onChange: handleChangeItemFillings,
							renderValue: (selected: any): any => selected ? selected.join(', ') : '',
						}}
						label="Recheios"
					>
						{itemFillingsArray.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								<Checkbox sx={{ py: 0, }} checked={itemFillings.includes(option.value)} />
								<Box component="span" sx={{ flexGrow: 1, }}>
									{option.label}
								</Box>
								<Box component="span">
										+ R$ {option.price}
								</Box>
							</MenuItem>
						))}
					</TextField>
					<Snackbar
						open={openItemFillingsSnackbar}
						autoHideDuration={6000}
						onClose={(): any => handleChangeOpenItemFillingsSnackbar(false)}
						anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
					>
						<Alert onClose={(): any => handleChangeOpenItemFillingsSnackbar(false)} severity="error" sx={{ width: '100%', }}>
								Você só pode escolher no máximo 2 recheios
						</Alert>
					</Snackbar>
						
					<Divider sx={{ my: 2, }}/>

					<Typography sx={{ mb: 1, }}>Quantidade</Typography>
					<TextField
						label="Quantidade"
						type="number"
						value={quantity}
						onChange={handleChangeQuantity}
						InputProps={{ inputProps: { min: 1, }, }}/>

					<Typography sx={{ mb: 1, mt: 2, }}>Tamanho</Typography>
					<TextField
						fullWidth
						select
						SelectProps={{
							value: size,
							onChange: handleChangeSize,
						}}
						label="Tamanho"
					>
						{itemSizesArray.map((option) => (
							<MenuItem key={option} value={option}>
								<Box component="span" sx={{ flexGrow: 1, }}>
									{option}
								</Box>
							</MenuItem>
						))}
					</TextField>

					<MainButton style={{ marginTop: '1em', }}>Concluir</MainButton>
				</FormControlStyled>
			</BoxDialog>
		</Dialog>
	);
};