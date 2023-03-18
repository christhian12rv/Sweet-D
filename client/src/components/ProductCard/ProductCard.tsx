import { Box, Paper, Divider, Grid, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import React from 'react';
import { BoxImg, CardContentStyled, CardStyled, Title, Price, Description, CardActionsStyled, BoxActionIcon, BoxActionLink } from './ProductCard.styled';
import DonutImg from '../../assets/img/donut-example.jpg';
import { ExitToAppRounded, ShoppingBagOutlined, StorefrontOutlined } from '@mui/icons-material';
import { LinkUnstyled } from '../LinkUnstyled';

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

	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = (): void => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = (): void => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step: number): void => {
		setActiveStep(step);
	};

	return (
		<CardStyled>
			<CardContentStyled>
				<Carousel indicatorIconButtonProps={{
					style: {
						display: 'none',
					},
				}}>
					{images.map((step, index) => (
						<LinkUnstyled key={index} to="/products/teste">
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
				{/* <MainButton style={{ width: '100%', flexGrow: 1, }}>Visitar</MainButton> */}
				<BoxActionIcon component="div" sx={{ flexGrow: 1, }}>
					<BoxActionLink className="boxActionLink" to="/products/teste">
						<ExitToAppRounded sx={{ fontSize: '1.7em', }}/>
					</BoxActionLink>
				</BoxActionIcon>
				<BoxActionIcon component="div">
					<BoxActionLink className="boxActionLink" to="/products/teste">
						<ShoppingBagOutlined sx={{ fontSize: '1.7em', }}/>
					</BoxActionLink>
				</BoxActionIcon>
				<BoxActionIcon component="div">
					<BoxActionLink className="boxActionLink" to="/products/teste">
						<StorefrontOutlined sx={{ fontSize: '1.7em', }}/>
					</BoxActionLink>
				</BoxActionIcon>
			</CardActionsStyled>
		</CardStyled>
	);
};