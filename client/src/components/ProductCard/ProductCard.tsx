import { Divider, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import React from 'react';
import { BoxImg, CardContentStyled, CardStyled, Title, Price, Description, CardActionsStyled, BoxActionIcon, BoxActionLink } from './ProductCard.styled';
import { ExitToAppRounded, ShoppingBagOutlined, StorefrontOutlined } from '@mui/icons-material';
import { LinkUnstyled } from '../LinkUnstyled';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { MainButton } from '../MainButton';

const images = [
	{
		imgPath: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqS4EbhiRWPpik9K0oT7EvL1Z0qlbRMAzk2Rq9ydGTsM1ze_kgBXk3Go7sqb5O2g0AEsjx8o4VDSkhFN7jkn42khiNErDSlsnt-IC-LmHhqplB8hTWYXD3rOmf4fT1Qs6_5K4LnCg69pVtUgIL0YLdfFowLQcCDrZx9nVlNl9Iws2khcKY1BF5Zv_P/s1500/bolo-de-pote-0.jpg',
	},
	{
		imgPath: 'https://bolosparavender.com.br/wp-content/uploads/2018/10/sabores-de-bolo-no-pote-mais-vendidos-1200x800.jpg',
	},
	{
		imgPath: 'https://i0.wp.com/varandadobolo.com.br/wp-content/uploads/2021/08/chocolate-cake-pot-delivery-copy-space-edited.jpg?resize=800%2C451&ssl=1',
	},
	{
		imgPath: 'https://minutocriadordigital.com.br/wordpress/wp-content/files/minutocriadordigital.com.br/2020/12/bolos-no-pote.jpeg',
	}
];

export const ProductCard: React.FunctionComponent = () => {

	return (
		<CardStyled>
			<CardContentStyled>
				<Carousel indicatorIconButtonProps={{
					style: {
						display: 'none',
					},
				}}>
					{images.map((step, index) => (
						<LinkUnstyled key={index} to={RoutesEnum.PRODUCT + 'teste'}>
							<BoxImg component="div" sx={{ backgroundImage: `url(${step.imgPath})`, }}/>
						</LinkUnstyled>
					))}
				</Carousel>
				<Grid display="flex" flexDirection="column" gap={1} justifyContent="center" sx={{ p: '.75em 1em', }}>
					<Title variant="h6" fontWeight="bold">
						Bolo no pote
					</Title>
					<Description variant="body1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolorum reprehenderit maiores.
					</Description>
					<Price variant="h6" fontWeight="bold" textAlign="center">
						R$ 7,50
					</Price>
					<Divider/>
					
				</Grid>
			</CardContentStyled>
			<CardActionsStyled>
				<BoxActionIcon component="div" sx={{ flexGrow: 1, }}>
					<BoxActionLink className="boxActionLink" to={RoutesEnum.PRODUCT + 'teste'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
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