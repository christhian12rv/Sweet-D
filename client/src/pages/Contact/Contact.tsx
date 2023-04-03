import { Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { MainButton } from '../../components/MainButton';
import SocialNetworksLinksEnum from '../../types/enums/SocialNetworksLinksEnum';
import { useTitle } from '../../utils/hooks/useTitle';
import { CardBox } from '../Home/DateVisualization/DateVisualization.styled';
import { BoxArea, EmailIcon, GridContainer, InstagramIcon, WhatsAppIcon } from './Contact.styled';

export const Contact: React.FunctionComponent = () => {
	const [email, setEmail] = useState({
		name: '',
		email: '',
		message: '',
	});

	useTitle('Contato');

	const handleChangeEmailInput = (property, event): void => {
		setEmail({ ...email, [property]: event.target.value, });
	};

	return (
		<BoxArea>
			<GridContainer>
				<Typography variant="h4">Contato</Typography>
				{/* <Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={3} sx={{ width: '100%', }}>
					<CardBox sx={{ padding: 4, height: '550px', width: '550px', minWidth: '300px', }}>
						<Typography variant="h5">Email</Typography>
						<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], textAlign: 'center', })}>Nos envie um email se precisar de alguma ajuda ou se tiver alguma dúvida.</Typography>
						
						<FormControl sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, width: '100%', mt: 3, }}>
							<TextField type="text" label="Nome" value={email.name} onChange={(event): any => handleChangeEmailInput('name', event)}
								sx={{ width: '100%', }}/>
							<TextField type="email" label="Email" value={email.email} onChange={(event): any => handleChangeEmailInput('email', event)}
								sx={{ width: '100%', }}/>
							<TextField type="text" multiline rows={4} label="Mensagem" value={email.message} onChange={(event): any => handleChangeEmailInput('message', event)}
								sx={{ width: '100%', }}/>
							<MainButton style={{ width: '100%', }}>Enviar</MainButton>
						</FormControl>
					</CardBox>

					<CardBox sx={{ padding: 4, height: '550px', width: '550px', minWidth: '300px', }}>
						<Typography variant="h5">Redes Sociais</Typography>
						<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], textAlign: 'center', })}>Você também pode nos contatar via Instagram ou Whatsapp. Ao clicar no ícone do Whatsapp, você será redirecionado para nosso grupo.</Typography>
						
						<Grid display="flex" alignItems="center" justifyContent="center" gap={2} my={3}>
							<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM}>
								<InstagramIcon/>
							</LinkUnstyled>
							<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP}>
								<WhatsAppIcon/>
							</LinkUnstyled>
						</Grid>

						<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], textAlign: 'center', })}>Se preferir, você pode entrar em contato direto com nossos vendedores.</Typography>
						<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={2} my={3}>
							<Grid sx={{ textAlign: 'center', }}>
								<Typography variant="h6">Rafael</Typography>
								<Grid display="flex" alignItems="center" justifyContent="center" gap={1}>
									<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM} style={{ lineHeight: 'normal', }}>
										<InstagramIcon sx={{ fontSize: '30px !important', }}/>
									</LinkUnstyled>
									<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP} style={{ lineHeight: 'normal', }}>
										<WhatsAppIcon sx={{ fontSize: '30px !important', }}/>
									</LinkUnstyled>
								</Grid>
							</Grid>

							<Divider orientation="vertical" sx={{ height: '65px', }}/>

							<Grid sx={{ textAlign: 'center', }}>
								<Typography variant="h6">Fellype</Typography>
								<Grid display="flex" alignItems="center" justifyContent="center" gap={1}>
									<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM} style={{ lineHeight: 'normal', }}>
										<InstagramIcon sx={{ fontSize: '30px !important', }}/>
									</LinkUnstyled>
									<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP} style={{ lineHeight: 'normal', }}>
										<WhatsAppIcon sx={{ fontSize: '30px !important', }}/>
									</LinkUnstyled>
								</Grid>
							</Grid>
						</Grid>

						<Grid display="flex" alignItems="center" justifyContent="center" gap={2}>
							<Typography variant="body1" sx={{ fontSize: '1.15em', textAlign: 'center', }}>(34) 99917-7677</Typography>

							<Divider orientation="vertical" sx={{ height: '40px', }}/>

							<Typography variant="body1" sx={{ fontSize: '1.15em', textAlign: 'center', }}>(38) 99968-9339</Typography>
						</Grid>
					</CardBox>
				</Grid> */}
				<Grid container rowSpacing={7} columnSpacing={10}>
					<Grid item xs={12} sm={6}>
						<CardBox sx={{ padding: 4, height: '100%',  }}>
							<Typography variant="h5">Email</Typography>
							<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], textAlign: 'center', })}>Nos envie um email se precisar de alguma ajuda ou se tiver alguma dúvida.</Typography>
							
							<FormControl sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, width: '100%', mt: 3, }}>
								<TextField type="text" label="Nome" value={email.name} onChange={(event): any => handleChangeEmailInput('name', event)}
									sx={{ width: '100%', }}/>
								<TextField type="email" label="Email" value={email.email} onChange={(event): any => handleChangeEmailInput('email', event)}
									sx={{ width: '100%', }}/>
								<TextField type="text" multiline rows={4} label="Mensagem" value={email.message} onChange={(event): any => handleChangeEmailInput('message', event)}
									sx={{ width: '100%', }}/>
								<MainButton style={{ width: '100%', }}>Enviar</MainButton>
							</FormControl>
						</CardBox>
					</Grid>

					<Grid item xs={12} sm={6}>
						<CardBox sx={{ padding: 4, height: '100%', }}>
							<Typography variant="h5">Redes Sociais</Typography>
							<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], textAlign: 'center', })}>Você também pode nos contatar via Instagram ou Whatsapp. Ao clicar no ícone do Whatsapp, você será redirecionado para nosso grupo.</Typography>
							
							<Grid display="flex" alignItems="center" justifyContent="center" gap={2} my={3}>
								<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM}>
									<InstagramIcon/>
								</LinkUnstyled>
								<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP}>
									<WhatsAppIcon/>
								</LinkUnstyled>
							</Grid>

							<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], textAlign: 'center', })}>Se preferir, você pode entrar em contato direto com nossos vendedores.</Typography>
							<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={2} my={3}>
								<Grid sx={{ textAlign: 'center', }}>
									<Typography variant="h6">Rafael</Typography>
									<Grid display="flex" alignItems="center" justifyContent="center" gap={1}>
										<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM} style={{ lineHeight: 'normal', }}>
											<InstagramIcon sx={{ fontSize: '30px !important', }}/>
										</LinkUnstyled>
										<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP} style={{ lineHeight: 'normal', }}>
											<WhatsAppIcon sx={{ fontSize: '30px !important', }}/>
										</LinkUnstyled>
									</Grid>
								</Grid>

								<Divider orientation="vertical" sx={{ height: '65px', }}/>

								<Grid sx={{ textAlign: 'center', }}>
									<Typography variant="h6">Fellype</Typography>
									<Grid display="flex" alignItems="center" justifyContent="center" gap={1}>
										<LinkUnstyled to={SocialNetworksLinksEnum.INSTAGRAM} style={{ lineHeight: 'normal', }}>
											<InstagramIcon sx={{ fontSize: '30px !important', }}/>
										</LinkUnstyled>
										<LinkUnstyled to={SocialNetworksLinksEnum.WHATSAPP} style={{ lineHeight: 'normal', }}>
											<WhatsAppIcon sx={{ fontSize: '30px !important', }}/>
										</LinkUnstyled>
									</Grid>
								</Grid>
							</Grid>

							<Grid display="flex" alignItems="center" justifyContent="center" gap={2}>
								<Typography variant="body1" sx={{ fontSize: '1.15em', textAlign: 'center', }}>(34) 99917-7677</Typography>

								<Divider orientation="vertical" sx={{ height: '40px', }}/>

								<Typography variant="body1" sx={{ fontSize: '1.15em', textAlign: 'center', }}>(38) 99968-9339</Typography>
							</Grid>
						</CardBox>
					</Grid>
				</Grid>
			</GridContainer>
		</BoxArea>
	);
};