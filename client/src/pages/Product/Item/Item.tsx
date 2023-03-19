import { Box, Dialog, Divider, Grid, MenuItem, TextField, Typography, Checkbox, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import { BoxImg, BoxDialog, FormControlStyled, ItemDescription, ItemName, ItemPrice } from './Item.styled';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { MainButton } from '../../../components/MainButton';
import { ShoppingCartRounded } from '@mui/icons-material';
import { CloseDialogIcon } from './Item.styled';

const images = [
	{
		imgPath: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqS4EbhiRWPpik9K0oT7EvL1Z0qlbRMAzk2Rq9ydGTsM1ze_kgBXk3Go7sqb5O2g0AEsjx8o4VDSkhFN7jkn42khiNErDSlsnt-IC-LmHhqplB8hTWYXD3rOmf4fT1Qs6_5K4LnCg69pVtUgIL0YLdfFowLQcCDrZx9nVlNl9Iws2khcKY1BF5Zv_P/s1500/bolo-de-pote-0.jpg',
	},
	{
		imgPath: 'https://bolosparavender.com.br/wp-content/uploads/2018/10/sabores-de-bolo-no-pote-mais-vendidos-1200x800.jpg',
	},
	{
		imgPath: 'https://i0.wp.com/varandadobolo.com.br/wp-content/uploads/2021/08/chocolate-cake-pot-delivery-copy-space-edited.jpg?resize=800%2C451&ssl=1',
	},
	{
		imgPath: 'https://minutocriadordigital.com.br/wordpress/wp-content/files/minutocriadordigital.com.br/2020/12/bolos-no-pote.jpeg',
	}
];

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

export const Item: React.FunctionComponent = () => {
	const [openBuyItemDialog, setOpenBuyItemDialog] = useState(false);
	const [isBuyAction, setIsBuyAction] = useState(false);
	const [itemPastas, setItemPastas] = useState<string[]>([]);
	const [itemFillings, setItemFillings] = useState<string[]>([]);
	const [openItemPastasSnackbar, setOpenItemPastasSnackbar] = useState(false);
	const [openItemFillingsSnackbar, setOpenItemFillingsSnackbar] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState('');
	

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
		<Grid display="flex" flexWrap="wrap" justifyContent="space-around" gap={10} px={2} sx={{ width: '100%', }}>
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
					{images.map((step, index) => (
						<LinkUnstyled key={index} to={RoutesEnum.PRODUCT + 'teste'} style={{ height: '100%', }}>
							<BoxImg component="div" sx={{
								height: '100%',
								backgroundImage: `url(${step.imgPath})`,
							}}/>
						</LinkUnstyled>
					))}
				</Carousel>
			</Box>

			<Grid display="flex" flexDirection="column" gap={3} sx={{ maxWidth: '500px', }}>
				<ItemName variant="h4">Bolo de Pote</ItemName>
				<ItemDescription variant="body1">
					Nosso delicioso bolo de pote é a escolha perfeita para quem quer desfrutar de um saboroso doce de maneira prática e conveniente. Feito com ingredientes de alta qualidade, esse bolo é cuidadosamente preparado em camadas, com uma generosa porção de massa fofa intercalada com camadas cremosas e recheios saborosos.
					<br/><br/>
					Com um tamanho perfeito para ser transportado em qualquer lugar, cada pote é individualmente preparado e decorado à mão, garantindo uma apresentação elegante e um sabor irresistível em cada mordida.
					<br/><br/>
					Escolha entre nossas várias opções de sabores, desde clássicos como chocolate e baunilha até opções mais ousadas como frutas vermelhas. Compre agora e experimente a delícia que é nosso bolo de pote!
				</ItemDescription>
				<ItemPrice variant="h5">R$ 12,90</ItemPrice>
				<Grid display="flex" alignItems="center" justifyContent="center" gap={2}>
					<MainButton style={{ flexGrow: 1, }} onClick={(): any => handleButtonBuyClick(true)}>Comprar</MainButton>
					<MainButton onClick={(): any => handleButtonBuyClick(false)}><ShoppingCartRounded/></MainButton>
				</Grid>
			</Grid>

			<Dialog
				open={openBuyItemDialog}
				onClose={handleCloseBuyItemDialog}
			>
				<BoxDialog>
					<Grid display="flex" alignItems="center" justifyContent="center" mb="1em">
						<Typography variant="h6" component="h2" mx="auto">
								Escolha os ingredientes
						</Typography>
						<CloseDialogIcon onClick={handleCloseBuyItemDialog}/>
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
		</Grid>
	);
};