import { Dialog, Grid, Typography, TextField, MenuItem, Box, Checkbox, Snackbar, Alert, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MainButton } from '../../../../../components/MainButton';
import ProductChoicesType from '../../../../../types/Product/ProductChoicesType';
import ProductType from '../../../../../types/Product/ProductType';
import brlCurrencyFormatter from '../../../../../utils/brlCurrencyFormatter';
import { BoxDialog, CloseDialogIcon, FormControlStyled } from './EditItem.styled';

type Props = {
	openEditItemDialog: boolean;
	setOpenEditItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditItem: React.FunctionComponent<Props> = ({ openEditItemDialog, setOpenEditItemDialog, }) => {
	const nowDate = new Date();

	const [product, setProduct] = useState<ProductType>({
		id: 0,
		name: '',
		description: '',
		photos: '',
		price: 0,
		sizes: ['250ml', '500ml'],
		slug: '',
		active: true,
		createdAt: nowDate,
		updatedAt: null,
		ingredients: {
			id: 0,
			pastas: [
				{
					id: 1,
					name: 'Chocolate',
					price: 0,
					createdAt: nowDate,
					updatedAt: null,
				},
				{
					id: 2,
					name: 'Baunilha',
					price: 0,
					createdAt: nowDate,
					updatedAt: null,
				},
				{
					id: 3,
					name: 'Misto',
					price: 0,
					createdAt: nowDate,
					updatedAt: null,
				}
			],
			pastasMinQuantity: 2,
			pastasMaxQuantity: 2,
			fillings: [
				{
					id: 1,
					name: 'Abacaxi',
					price: 2.30,
					createdAt: nowDate,
					updatedAt: null,
				},
				{
					id: 2,
					name: 'Ninho',
					price: 2.30,
					createdAt: nowDate,
					updatedAt: null,
				},
				{
					id: 3,
					name: 'Morango',
					price: 2.30,
					createdAt: nowDate,
					updatedAt: null,
				}
			],
			fillingsMinQuantity: 2,
			fillingsMaxQuantity: 2,
			createdAt: nowDate,
			updatedAt: null,
		},
	});
	const [productChoices, setProductChoices] = useState<ProductChoicesType>({
		pastas: [],
		fillings: [],
		quantity: 1,
		size: '',
	});
	const [openProductChoicesPastasSnackbar, setOpenProductChoicesPastasSnackbar] = useState(false);
	const [openProductChoicesFillingsSnackbar, setOpenProductChoicesFillingsSnackbar] = useState(false);
	
	const handleCloseEditItemDialog = (): void => {
		setOpenEditItemDialog(false);
	};

	const handleChangeProductChoicesPastas = (event): void => {
		if (product.ingredients?.pastas) {
			const pastasMaxQuantity = product.ingredients?.pastasMaxQuantity ?? 0;
			if (event.target.value.length > pastasMaxQuantity) {
				handleChangeOpenProductChoicesPastasSnackbar(true);
				return;
			}

			setProductChoices({ ...productChoices, pastas: event.target.value, });
		}
	};

	const handleChangeProductChoicesFillings = (event): void => {
		if (product.ingredients?.fillings) {
			const fillingsMaxQuantity = product.ingredients?.fillingsMaxQuantity ?? 0;
			if (event.target.value.length > fillingsMaxQuantity) {
				handleChangeOpenProductChoicesFillingsSnackbar(true);
				return;
			}

			setProductChoices({ ...productChoices, fillings: event.target.value, });
		}
	};

	const handleChangeOpenProductChoicesPastasSnackbar = (value): void => {
		setOpenProductChoicesPastasSnackbar(value);
	};

	const handleChangeOpenProductChoicesFillingsSnackbar = (value): void => {
		setOpenProductChoicesFillingsSnackbar(value);
	};

	const handleChangeProductChoicesQuantity = (event): void => {
		setProductChoices({ ...productChoices, quantity: Number(event.target.value), });
	};

	const handleChangeProductChoicesSize = (event): void => {
		setProductChoices({ ...productChoices, size: event.target.value, });
	};

	return (
		<Dialog
			open={openEditItemDialog}
			onClose={handleCloseEditItemDialog}
			disableScrollLock={true}
		>
			<BoxDialog>
				<Grid display="flex" alignItems="center" justifyContent="center" mb="1em">
					<Typography variant="h6" component="h2" mx="auto">
								Escolha os ingredientes
					</Typography>
					<CloseDialogIcon onClick={handleCloseEditItemDialog}/>
				</Grid>

				<FormControlStyled>
					{product.ingredients?.pastas &&
					<>
						<Typography sx={{ mb: 1, }}>Massas</Typography>
						<TextField
							fullWidth
							select
							SelectProps={{
								multiple: true,
								value: productChoices.pastas,
								onChange: handleChangeProductChoicesPastas,
								renderValue: (selected: any): any => selected ? selected.map(s => product.ingredients?.pastas?.find(p => p.id === s)?.name).join(', ') : '',
							}}
							label="Massas"
						>
							{product.ingredients.pastas.map((option) => (
								<MenuItem key={option.id} value={option.id}>
									<Checkbox sx={{ py: 0, }} checked={!!productChoices.pastas?.find(p => p === option.id)} />
									<Box component="span" sx={{ flexGrow: 1, }}>
										{option.name}
									</Box>
									<Box component="span">
											+ {brlCurrencyFormatter.format(option.price)}
									</Box>
								</MenuItem>
							))}
						</TextField>
						<Snackbar
							open={openProductChoicesPastasSnackbar}
							autoHideDuration={6000}
							onClose={(): any => handleChangeOpenProductChoicesPastasSnackbar(false)}
							anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
						>
							<Alert onClose={(): any => handleChangeOpenProductChoicesPastasSnackbar(false)} severity="error" sx={{ width: '100%', }}>
									Você só pode escolher no máximo {product.ingredients.pastasMaxQuantity} massas
							</Alert>
						</Snackbar>
					</>
					}

					{product.ingredients?.fillings &&
					<>
						<Typography sx={{ mb: 1, mt: 2, }}>Recheios</Typography>
						<TextField
							fullWidth
							select
							SelectProps={{
								multiple: true,
								value: productChoices.fillings,
								onChange: handleChangeProductChoicesFillings,
								renderValue: (selected: any): any => selected ? selected.map(s => product.ingredients?.fillings?.find(p => p.id === s)?.name).join(', ') : '',
							}}
							label="Recheios"
						>
							{product.ingredients.fillings.map((option) => (
								<MenuItem key={option.id} value={option.id}>
									<Checkbox sx={{ py: 0, }} checked={!!productChoices.fillings?.find(p => p === option.id)} />
									<Box component="span" sx={{ flexGrow: 1, }}>
										{option.name}
									</Box>
									<Box component="span">
											+ {brlCurrencyFormatter.format(option.price)}
									</Box>
								</MenuItem>
							))}
						</TextField>
						<Snackbar
							open={openProductChoicesFillingsSnackbar}
							autoHideDuration={6000}
							onClose={(): any => handleChangeOpenProductChoicesFillingsSnackbar(false)}
							anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
						>
							<Alert onClose={(): any => handleChangeOpenProductChoicesFillingsSnackbar(false)} severity="error" sx={{ width: '100%', }}>
									Você só pode escolher no máximo {product.ingredients.fillingsMaxQuantity} recheios
							</Alert>
						</Snackbar>
					</>
					}
						
					<Divider sx={{ my: 2, }}/>

					<Typography sx={{ mb: 1, }}>Quantidade</Typography>
					<TextField
						label="Quantidade"
						type="number"
						value={productChoices.quantity}
						onChange={handleChangeProductChoicesQuantity}
						InputProps={{ inputProps: { min: 1, }, }}/>

					<Typography sx={{ mb: 1, mt: 2, }}>Tamanho</Typography>
					<TextField
						fullWidth
						select
						SelectProps={{
							value: productChoices.size,
							onChange: handleChangeProductChoicesSize,
						}}
						label="Tamanho"
					>
						{product.sizes.map((option) => (
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