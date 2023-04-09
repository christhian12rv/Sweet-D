import { Divider, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import React from 'react';
import { BoxImg, CardContentStyled, CardStyled, Title, Price, Description, CardActionsStyled, BoxActionIcon, BoxActionLink } from './ProductCard.styled';
import { ExitToAppRounded, ShoppingBagOutlined, StorefrontOutlined } from '@mui/icons-material';
import { LinkUnstyled } from '../LinkUnstyled';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { MainButton } from '../MainButton';
import ProductType from '../../types/Product/ProductType';
import brlCurrencyFormatter from '../../utils/brlCurrencyFormatter';

type Props = {
	product: ProductType
};

export const ProductCard: React.FunctionComponent<Props> = ({ product, }) => {

	const { name, description, photos, slug, sizes,  } = product;
	
	return (
		<CardStyled>
			<CardContentStyled>
				<Carousel indicatorIconButtonProps={{
					style: {
						display: 'none',
					},
				}}>
					{JSON.parse(photos).map((p, index) => (
						<LinkUnstyled key={index} to={RoutesEnum.PRODUCT + product.slug}>
							<BoxImg component="div" sx={{ backgroundImage: `url(${p.url})`, }}/>
						</LinkUnstyled>
					))}
				</Carousel>
				<Grid display="flex" flexDirection="column" gap={1} justifyContent="center" sx={{ p: '.75em 1em', }}>
					<Title variant="h6" fontWeight="bold">
						{name}
					</Title>
					<Description component="span">
						<div dangerouslySetInnerHTML={{ __html: description, }}></div>
					</Description>
					<Price variant="h6" fontWeight="bold" textAlign="center">
						{brlCurrencyFormatter.format(sizes ? sizes[0].price : 0 )}
					</Price>
					<Divider/>
					
				</Grid>
			</CardContentStyled>
			<CardActionsStyled>
				<BoxActionIcon component="div" sx={{ flexGrow: 1, }}>
					<BoxActionLink className="boxActionLink" to={RoutesEnum.PRODUCT + slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
						<MainButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', }}>
							<ExitToAppRounded sx={{ fontSize: '1.7em', }}/>
							VISITAR
						</MainButton>
					</BoxActionLink>
				</BoxActionIcon>
			</CardActionsStyled>
		</CardStyled>
	);
};