import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ProductCard } from '../../../components/ProductCard';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import { MainButton } from '../../../components/MainButton';
import RoutesEnum from '../../../types/enums/RoutesEnum';

const array = [1,2,3];

export const OtherProducts: React.FunctionComponent = () => {
	return (
		<Grid display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={5} mt={8} width="100%">
			<Typography variant="h4" fontWeight="bold">
				Outros Produtos
			</Typography>
			<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={5} width="100%">
				{array.map(a => (
					<ProductCard key={a}/>
				))}
			</Grid>
			<LinkUnstyled to={RoutesEnum.PRODUCTS} style={{ marginTop: '1em', }}>
				<MainButton style={{ fontSize: '1em', }}>Ver mais produtos</MainButton>
			</LinkUnstyled>
		</Grid>
	);
};