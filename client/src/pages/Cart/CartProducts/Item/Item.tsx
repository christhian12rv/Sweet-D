import { Edit, Delete } from '@mui/icons-material';
import { Box,Grid,ListItem,ListItemText, ListSubheader, Typography } from '@mui/material';
import React, { useState } from 'react';
import { MainButton } from '../../../../components/MainButton';
import ProductChoicesType from '../../../../types/Product/ProductChoicesType';
import ProductType from '../../../../types/Product/ProductType';
import { EditItem } from './EditItem';
import { BoxImg, IngredientsList, Title } from './Item.styled';
import brlCurrencyFormatter from '../../../../utils/brlCurrencyFormatter';
import getTotalPriceOfProduct from '../../../../utils/getTotalPriceOfProduct';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import { fetchCart as fetchCartAction, removeOfCart as removeOfCartAction } from '../../../../store/features/cart/cart.actions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

type Props = {
	productChoices: ProductChoicesType;
	product?: ProductType | undefined;
}

export const Item: React.FunctionComponent<Props> = ({ productChoices, product, }) => {
	if (!product)
		return;
	
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [openEditItemDialog, setOpenEditItemDialog] = useState(false);

	const handleSetOpenEditItemDialog = (): void => {
		setOpenEditItemDialog(true);
	};

	const handleDeleteItemClick = (): void => {
		removeOfCartAction(productChoices.id);
		dispatch(fetchCartAction());
	};

	return (
		<Box>
			<Grid display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
				<LinkUnstyled to={RoutesEnum.PRODUCT + product.slug}>
					<BoxImg component="div" sx={{ backgroundImage: `url(${JSON.parse(product.photos)[0].url})`, }} />
				</LinkUnstyled>

				<Grid display="flex" flexDirection="column" flexGrow={1} width="min-content">
					<Title variant="h6">{product.name}</Title>

					<IngredientsList>
						{productChoices.ingredients.map((ingredient) => (
							<React.Fragment key={ingredient.type}>
								<li>
									<ul>
										<ListSubheader sx={{ py: 0, lineHeight: '38px', }}>{ingredient.type}</ListSubheader>
										{ingredient.ingredients.map(i => (
											<ListItem key={i} sx={{ py: 0, px: 2, }}>
												<ListItemText primary={(product.ingredients?.find(pi => pi.id === i)?.name || '') +
												'\n(' + (brlCurrencyFormatter.format(product.ingredients?.find(pi => pi.id === i)?.price || 0) || '') + ')'} />
											</ListItem>
										))}
									</ul>
								</li>
							</React.Fragment>
						))}
					</IngredientsList>
				</Grid>

				<Grid display="flex" flexDirection="column" sx={{ marginInlineEnd: 'auto', }}>
					<Title variant="h6">
						{brlCurrencyFormatter.format(getTotalPriceOfProduct(product, productChoices))
						+ (productChoices.quantity > 1 ?
							` (${brlCurrencyFormatter.format(getTotalPriceOfProduct(product, productChoices) / productChoices.quantity)} x${productChoices.quantity})`
							: '')}
					</Title>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>Quantidade: {productChoices.quantity}</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>
						Tamanho: {product.sizes?.find(p => p.id === productChoices.size)?.name || ''}
						&nbsp;({brlCurrencyFormatter.format(product.sizes?.find(p => p.id === productChoices.size)?.price || 0) || ''})
					</Typography>

					<Grid display="flex" gap={2} sx={{ mt: 1, }}>
						<MainButton style={{ padding: 0, width: '10px !important', }} onClick={handleSetOpenEditItemDialog}>
							<Edit/>
						</MainButton>
						<MainButton onClick={handleDeleteItemClick} style={{ padding: 0, }}>
							<Delete/>
						</MainButton>
					</Grid>
				</Grid>
			</Grid>

			<EditItem
				openEditItemDialog={openEditItemDialog}
				setOpenEditItemDialog={setOpenEditItemDialog}
				productChoices={productChoices}
				product={product}
			/>
		</Box>
	);
};