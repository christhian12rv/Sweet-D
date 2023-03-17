import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, useScrollTrigger, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Face from '@mui/icons-material/Face';
import Logo from '../../assets/img/Logo.png';
import { AppBarCustom, BoxArea, CartIcon, GridContainer, LogoImg, LogoTitle, NavItem, LoginButton } from './Navbar.styled';
import { LinkUnstyled } from '../LinkUnstyled/LinkUnstyled.styled';
import RoutesEnum from '../../types/enums/RoutesEnum';
import ScreenSizeQuerysEnum from '../../types/enums/ScreenSizeQuerysEnum';

type Props = {
	window?: () => Window;
}

const navItems = ['Home', 'Produtos', 'Quem Somos', 'Contato'];

export const Navbar: React.FunctionComponent<Props> = (props) => {
	const { window, } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');

	const scrollTrigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	const handleDrawerToggle = (): void => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', }}>
			<Typography variant="h6" sx={{ my: 2, }}>
        SWEET-D
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: 'center', }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? (): HTMLElement => window()?.document.body : undefined;

	return (
		<BoxArea>
			<GridContainer>
				<CssBaseline />
				<AppBarCustom component="nav" scrollTrigger={scrollTrigger}>
					<Toolbar sx={{ display: 'flex', }}>
						<IconButton
							color="inherit"
							aria-label="Abrir navbar"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: isMobile ? 'block' : 'none', }}
						>
							<MenuIcon />
						</IconButton>
						
						<LogoImg component="img" src={Logo}/>
						<LinkUnstyled to="/">
							<LogoTitle
								variant="h6"
								px={2}
							>
								SweetD
							</LogoTitle>
						</LinkUnstyled>

						{!isMobile &&
						<>
							<Box sx={{ display: 'flex', placeContent: 'center', width: '100%', flexGrow: 1, gap: 4, }}>
								{navItems.map((item) => (
									<NavItem key={item}>
										<Typography variant='body1'>
											{item}
										</Typography>
									</NavItem>
								))}
							</Box>

							<Box sx={{ display: 'flex', placeContent: 'center', alignItems: 'center', gap: 1, minWidth: 'fit-content', }}>
								<LinkUnstyled to={RoutesEnum.CART}>
									<CartIcon />
								</LinkUnstyled>

								<Typography variant="body1">
									2
								</Typography>
								<Divider orientation="vertical" sx={(theme): any => ({
									height: '20px',
									backgroundColor: theme.palette.common.black,
								})}/>
								<Typography variant="body1" sx={{ mr: 1, }}>
									R$ 12,30
								</Typography>

								<LinkUnstyled to={RoutesEnum.CART}>
									<LoginButton>
										<Face sx={{ mr: 1, }}/>
										Login
									</LoginButton>
								</LinkUnstyled>
							</Box>
						</>
						}
					</Toolbar>
				</AppBarCustom>
				<Box component="nav">
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
						sx={{
							display: isMobile ? 'block' : 'none',
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, },
						}}
					>
						{drawer}
					</Drawer>
				</Box>
			</GridContainer>
		</BoxArea>
	);
};