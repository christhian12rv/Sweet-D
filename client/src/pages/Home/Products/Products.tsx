import { Grid, Typography } from '@mui/material';
import React from 'react';
import { MainButton } from '../../../components/MainButton';
import { ProductCard } from '../../../components/ProductCard';

const array = [1,2,3,4,5];

export const Products: React.FunctionComponent = () => {
	return (
		<Grid display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={5} mt={8} width="100%">
			<Typography variant="h4" fontWeight="bold">
				Produtos
			</Typography>
			<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={5} width="100%">
				{array.map(a => (
					<ProductCard key={a}/>
				))}
			</Grid>
			<MainButton style={{ fontSize: '1em', }}>Ver mais produtos</MainButton>
		</Grid>
	);
};