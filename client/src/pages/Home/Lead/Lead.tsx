import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import { MainButton } from '../../../components/MainButton';
import { InstagramIcon, WhatsAppIcon } from './Lead.styled';
import SocialNetworksLinksEnum from '../../../types/enums/SocialNetworksLinksEnum';
import DonutImg from '../../../assets/img/Donut.png';

export const Lead: React.FunctionComponent = () => {
	return (
		<Grid display="flex" flexWrap="wrap" justifyContent="space-around" gap={5} width="100%">
			<Grid display="flex" flexDirection="column" gap={4} maxWidth="600px">
				<Typography variant="h3" fontWeight="bold">
					Experimente nossos deliciosos produtos artesanais!
				</Typography>
				<Typography variant="body1" fontWeight="bold" textAlign="justify">
					Descubra um mundo de sabores e texturas em nossa confeitaria online. Satisfaça seu paladar com os nossos mais incríveis e tentadores produtos.  Não perca mais tempo e faça agora o seu pedido, sua felicidade está a apenas um clique de distância!
				</Typography>
				<Grid display="flex" alignItems="center" gap={1} marginTop={1.5}>
					<Box sx={{ flexGrow: '1', }}>
						<MainButton style={{ width: 'fit-content', }}>Ver Produtos</MainButton>
					</Box>
					<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM}>
						<InstagramIcon/>
					</LinkUnstyled>
					<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP}>
						<WhatsAppIcon/>
					</LinkUnstyled>
				</Grid>
			</Grid>
			<Grid display="flex" flexDirection="column" gap={4} maxWidth="600px">
				<Box component="img" src={DonutImg} sx={{ width: '300px', }}/>
			</Grid>
		</Grid>
	);
};