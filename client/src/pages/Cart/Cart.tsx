import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useTitle } from '../../utils/hooks/useTitle';
import { BoxArea, GridContainer } from './Cart.styled';
import { CartProducts } from './CartProducts';
import { CheckoutCard } from './CheckoutCard';

export const Cart: React.FunctionComponent = () => {

	useTitle('Carrinho');

	return (
		<BoxArea>
			<Typography variant="h4">Carrinho</Typography>
			<GridContainer>
				<CartProducts/>
				<CheckoutCard/>
			</GridContainer>
		</BoxArea>
	);
};