import { Box, Dialog, Divider, Grid, MenuItem, TextField, Typography, Checkbox, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import { BoxImg, BoxDialog, FormControlStyled, ItemDescription, ItemName, ItemPrice } from './Item.styled';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { MainButton } from '../../../components/MainButton';
import { ShoppingCartRounded } from '@mui/icons-material';
import { CloseDialogIcon } from './Item.styled';
import ProductType from '../../../types/Product/ProductType';
import brlCurrencyFormatter from '../../../utils/brlCurrencyFormatter';
import ProductChoicesType from '../../../types/Product/ProductChoicesType';
import { addToCart as addToCartAction } from '../../../store/features/cart/cart.actions';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

type Props = {
	product: ProductType;
}

export const Item: React.FunctionComponent<Props> = ({ product, }) => {
	const navigate = useNavigate();
	const [openBuyItemDialog, setOpenBuyItemDialog] = useState(false);
	const [isBuyAction, setIsBuyAction] = useState(false);
	
	const [productChoices, setProductChoices] = useState<ProductChoicesType>({
		id: product.id,
		size: 0,
		ingredients: product.ingredientTypes ? product.ingredientTypes.map(ingredientType => ({
			type: ingredientType.type,
			ingredients: [],
		})) : [],
		quantity: 1,
	});

	const handleOpenBuyItemDialog = (): void => {
		setOpenBuyItemDialog(true);
	};

	const handleCloseBuyItemDialog = (): void => {
		setOpenBuyItemDialog(false);
	};

	const handleChangeIsBuyAction = (value): void => {
		setIsBuyAction(value);
	};

	const handleButtonBuyClick = (value): void => {
		handleChangeIsBuyAction(value);
		handleOpenBuyItemDialog();
	};

	const handleBuyItemDialogFormSubmit = (event): void => {
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
		
		if (isBuyAction)
			navigate(RoutesEnum.CART);
		else {
			enqueueSnackbar('Produto adicionado ao carrinho', { variant: 'success', });
			handleCloseBuyItemDialog();
		}
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
		<Grid display="flex" flexWrap="wrap" justifyContent="center" gap={10} px={2} sx={{ width: '100%', }}>
			<Box sx={{ width: '500px', maxWidth: '90vw', height: '100%', mt: 2, }}>
				<Carousel autoPlay={false} height="400px" sx={{
					width: '100%',
					alignSelf: 'center',
					borderRadius: '17.5px',
					boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px !important',
					'&:hover': {
						boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
					},
					transition: 'all .5s',
				}} indicators={false}>
					{JSON.parse(product.photos).map(photo => (
						<BoxImg key={photo} component="div" sx={{
							height: '100%',
							backgroundImage: `url(${photo.url})`,
						}}/>
					))}
				</Carousel>
			</Box>

			<Grid display="flex" flexDirection="column" gap={3} sx={{ maxWidth: '500px', minWidth: '300px', }}>
				<ItemName variant="h4">{product.name}</ItemName>

				<ItemDescription variant="body1">
					<div dangerouslySetInnerHTML={{ __html: product.description, }}></div>
				</ItemDescription>

				<ItemPrice variant="h5">{brlCurrencyFormatter.format(product.sizes ?
					product.sizes.reduce((prev, cur) => (cur.price < prev.price ? cur : prev)).price
					: 0)}</ItemPrice>
				<Grid display="flex" alignItems="center" justifyContent="center" gap={2}>
					<MainButton style={{ flexGrow: 1, }} onClick={(): any => handleButtonBuyClick(true)}>Comprar</MainButton>
					<MainButton onClick={(): any => handleButtonBuyClick(false)}><ShoppingCartRounded/></MainButton>
				</Grid>
			</Grid>

			<Dialog
				open={openBuyItemDialog}
				onClose={handleCloseBuyItemDialog}
				disableScrollLock={true}
			>
				<BoxDialog>
					<Grid display="flex" alignItems="center" justifyContent="center" mb="1em">
						<Typography variant="h6" component="h2" mx="auto">
									Escolha os ingredientes
						</Typography>
						<CloseDialogIcon onClick={handleCloseBuyItemDialog}/>
					</Grid>

					<form onSubmit={handleBuyItemDialogFormSubmit}>
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
		</Grid>
	);
};