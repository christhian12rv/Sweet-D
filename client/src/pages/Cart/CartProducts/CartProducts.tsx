import { Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { MainButton } from '../../../components/MainButton';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import { useTitle } from '../../../utils/hooks/useTitle';
import { GridContainer } from './CartProducts.styled';
import { Item } from './Item';
import { fetchCart as fetchCartAction, clearCart as clearCartAction } from '../../../store/features/cart/cart.actions';
import { BackdropLoading } from '../../../components/BackdropLoading';
import ProductType from '../../../types/Product/ProductType';

type Props = {
	fetchProductsLoading: boolean;
	products: ProductType[];
}

export const CartProducts: React.FunctionComponent<Props> = ({ fetchProductsLoading, products, }) => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { productsChoices, } = useTypedSelector((state) => state.cart);

	useTitle('Carrinho');

	const handleClearCart = (): void => {
		clearCartAction();
		dispatch(fetchCartAction());
	};

	return (
		<Grid position="relative" display="flex" flexDirection="column" flexGrow={1} m={0}>
			{fetchProductsLoading ? <BackdropLoading open /> :
				<React.Fragment>
					<MainButton onClick={handleClearCart} style={{ marginLeft: 'auto', }}>Limpar</MainButton>
					<GridContainer flexDirection="column" gap={3}>
						{productsChoices.map(p => (
							<React.Fragment key={p.id}>
								<Item productChoices={p} product={products.find(product => product.id === p.id)} key={p.id}/>
								<Divider/>
							</React.Fragment>
						)
						)}
					</GridContainer>
				</React.Fragment>
			}
		</Grid>
	);
};