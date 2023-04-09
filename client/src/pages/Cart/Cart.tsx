import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTitle } from '../../utils/hooks/useTitle';
import { BoxArea, GridContainer } from './Cart.styled';
import { CartProducts } from './CartProducts';
import { CheckoutCard } from './CheckoutCard';
import { fetchCart as fetchCartAction } from '../../store/features/cart/cart.actions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { EmptyCart } from './EmptyCart';
import { BackdropLoading } from '../../components/BackdropLoading';

export const Cart: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { productsChoices, loading, } = useTypedSelector((state) => state.cart);

	useTitle('Carrinho');

	useEffect(() => {
		dispatch(fetchCartAction());
	}, []);

	return (
		<BoxArea>
			{!loading ? 
				productsChoices.length > 0 ?
					(
						<React.Fragment>
							<Typography variant="h4">Carrinho</Typography>
							<GridContainer>
								<CartProducts/>
								<CheckoutCard/>
							</GridContainer>
						</React.Fragment>
					)
					: (
						<EmptyCart />
					)
				: <BackdropLoading open />
			}
		</BoxArea>
	);
};