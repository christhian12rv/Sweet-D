import React from 'react';
import { BoxFooter, LogoImg, LogoTitle, InstagramIcon, WhatsAppIcon } from './Footer.styled';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import Logo from '../../../../assets/img/Logo.png';
import SocialNetworksLinksEnum from '../../../../types/enums/SocialNetworksLinksEnum';
import { Divider, Grid, Typography } from '@mui/material';

export const Footer: React.FunctionComponent = () => {
	return (
		<BoxFooter >
			<LinkUnstyled to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', }} >
				<LogoImg component="img" src={Logo}/>
				<LogoTitle
					variant="h6"
					px={2}
				>
					SweetD
				</LogoTitle>
			</LinkUnstyled>

			<Grid display="flex" alignItems="center" justifyContent="center" gap={3} mt={3} mb={1}>
				<Grid display="flex" alignItems="center" justifyContent="center" gap={1}>
					<Typography variant="body1" sx={{ mr: 1, }}>Rafael</Typography>
					<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM_RAFAEL} style={{ lineHeight: 'normal', }}>
						<InstagramIcon/>
					</LinkUnstyled>
					<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP_RAFAEL} style={{ lineHeight: 'normal', }}>
						<WhatsAppIcon/>
					</LinkUnstyled>
				</Grid>

				<Divider orientation="vertical"/>

				<Grid display="flex" alignItems="center" justifyContent="center" gap={1}>
					<Typography variant="body1" sx={{ mr: 1, }}>Fellype</Typography>
					<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM_FELLYPE} style={{ lineHeight: 'normal', }}>
						<InstagramIcon/>
					</LinkUnstyled>
					<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP_FELLYPE} style={{ lineHeight: 'normal', }}>
						<WhatsAppIcon/>
					</LinkUnstyled>
				</Grid>
			</Grid>

			<Typography variant="body1" textAlign="center" sx={(theme): any => ({ color: theme.palette.grey[1], })}>
				SweetD - Santa Mônica - Uberlândia MG Brasil
			</Typography>
			<Typography variant="body1" textAlign="center" sx={(theme): any => ({ color: theme.palette.grey[1], })}>
				© 2023. Todos direitos reservados.
			</Typography>
		</BoxFooter>
	);
};