import { Dialog, Grid, Typography, TextField, MenuItem, Box, Checkbox, Divider } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { MainButton } from '../../../../../components/MainButton';
import ProductChoicesType from '../../../../../types/Product/ProductChoicesType';
import ProductType from '../../../../../types/Product/ProductType';
import brlCurrencyFormatter from '../../../../../utils/brlCurrencyFormatter';
import { BoxDialog, CloseDialogIcon, FormControlStyled } from './EditItem.styled';
import { addToCart as addToCartAction, fetchCart as fetchCartAction } from '../../../../../store/features/cart/cart.actions';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

type Props = {
	openEditItemDialog: boolean;
	setOpenEditItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
	productChoices: ProductChoicesType;
	product: ProductType;
};

export const EditItem: React.FunctionComponent<Props> = (props) => {
	const { openEditItemDialog, setOpenEditItemDialog, product, } = props;
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const [productChoices, setProductChoices] = useState<ProductChoicesType>(props.productChoices);

	const handleCloseEditItemDialog = (): void => {
		setOpenEditItemDialog(false);
	};

	const handleEditItemDialogFormSubmit = (event): void => {
		event.preventDefault();
		let hasError = false;

		if (!productChoices.quantity || productChoices.quantity < 0) {
			enqueueSnackbar('Quantidade inválida', { variant: 'error', });
			hasError = true;
		}

		if (!productChoices.size || !product.sizes?.find(s => productChoices.size === s.id)) {
			enqueueSnackbar('Tamanho inválido', { variant: 'error', });
			hasError = true;
		}

		productChoices.ingredients.forEach(ingredient => {
			const ingredientType = product.ingredientTypes?.find(ingredientType => ingredientType.type === ingredient.type);
			if (!ingredientType || ingredient.ingredients.length < ingredientType.min) {
				enqueueSnackbar(`São necessário(a)s no mínimo ${ingredientType?.min} ${ingredientType?.type}s`, { variant: 'error', });
				hasError = true;
			}
		});

		if (hasError)
			return;
		
		addToCartAction(productChoices);
		
		dispatch(fetchCartAction());
		handleCloseEditItemDialog();
	};

	const handleChangeProductChoicesIngredients = (event, type): void => {
		const ingredientType = product.ingredientTypes?.find(ingredientType => ingredientType.type === type);
		if (event.target.value.length > (ingredientType?.max ? ingredientType?.max : 0)) {
			enqueueSnackbar(`Você pode escolher no máximo ${ingredientType?.max} ${ingredientType?.type}s`, { variant: 'error', });
			return;
		}

		const newIngredients = productChoices.ingredients.map(ingredient => {
			if (ingredient.type === type)
				ingredient.ingredients = event.target.value;
			return ingredient;
		}
		);

		setProductChoices({ ...productChoices, ingredients: newIngredients, });
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

				<form onSubmit={handleEditItemDialogFormSubmit}>
					<FormControlStyled>
						{product.ingredientTypes?.map((ingredientType, index) => (
							<React.Fragment key={ingredientType.id}>
								<Typography sx={{ mb: 1, }}>{ingredientType.type}</Typography>
								<TextField
									fullWidth
									select
									SelectProps={{
										multiple: true,
										value: productChoices.ingredients.find(ingredient => ingredient.type === ingredientType.type)?.ingredients || [],
										onChange: (event): any => handleChangeProductChoicesIngredients(event, ingredientType.type),
										renderValue: (selected: any): any => selected ? selected.map(s => product.ingredients?.find(i => i.id === s)?.name).join(', ') : '',
									}}
									label={ingredientType.type}
								>
									{product.ingredients?.filter(ingredient => ingredient.type === ingredientType.type).map((ingredient) => (
										<MenuItem key={ingredient.id} value={ingredient.id}>
											<Checkbox sx={{ py: 0, }} checked={!!productChoices.ingredients.find(ingredient => ingredient.type === ingredientType.type)?.ingredients.find(i => i === ingredient.id)} />
											<Box component="span" sx={{ flexGrow: 1, }}>
												{ingredient.name}
											</Box>
											<Box component="span">
												+ {brlCurrencyFormatter.format(ingredient.price)}
											</Box>
										</MenuItem>
									))}
								</TextField>
							</React.Fragment>
						))}
								
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
								renderValue: (selected: any): any => selected ? product.sizes?.find(size => size.id === selected)?.name : '',
							}}
							label="Tamanho"
						>
							{product.sizes?.map((size) => (
								<MenuItem key={size.id} value={size.id}>
									<Box component="span" sx={{ flexGrow: 1, }}>
										{size.name}
									</Box>
									<Box component="span">
										{brlCurrencyFormatter.format(size.price)}
									</Box>
								</MenuItem>
							))}
						</TextField>

						<MainButton type="submit" style={{ marginTop: '1em', }}>Concluir</MainButton>
					</FormControlStyled>
				</form>
			</BoxDialog>
		</Dialog>
	);
};