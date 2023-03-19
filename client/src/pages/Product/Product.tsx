import React from 'react';
import { Item } from './Item';
import { OtherProducts } from './OtherProducts';
import { BoxArea, GridContainer } from './Product.styled';

export const Product: React.FunctionComponent = () => {
	return (
		<BoxArea>
			<GridContainer>
				<Item/>
				<OtherProducts/>
			</GridContainer>
		</BoxArea>
	);
};