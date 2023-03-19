import { Grid, Typography } from '@mui/material';
import React from 'react';
import { BoxArea, GridContainer } from './Cart.styled';
import { CartProducts } from './CartProducts';
import { CheckoutCard } from './CheckoutCard';

export const Cart: React.FunctionComponent = () => {
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