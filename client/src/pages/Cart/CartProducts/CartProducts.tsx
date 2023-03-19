import { Divider } from '@mui/material';
import React from 'react';
import { GridContainer } from './CartProducts.styled';
import { Item } from './Item';

const array = [1,2,3];

export const CartProducts: React.FunctionComponent = () => {
	return (
		<GridContainer flexDirection="column" gap={3}>
			{array.map(a => (
				<>
					<Item key={a}/>
					<Divider/>
				</>
			)
			)}
		</GridContainer>
	);
};