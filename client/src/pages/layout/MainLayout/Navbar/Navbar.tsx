import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, useScrollTrigger, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Face from '@mui/icons-material/Face';
import Logo from '../../../../assets/img/Logo.png';
import { AppBarCustom, BoxArea, CartIcon, LogoImg, LogoTitle, NavItem, LoginButton, NavItemMobile, BoxSidebarMobile } from './Navbar.styled';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import ScreenSizeQuerysEnum from '../../../../types/enums/ScreenSizeQuerysEnum';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import { useLocation } from 'react-router-dom';

type Props = {
	window?: () => Window;
}

const navItems = [
	{
		title: 'Home',
		link: '/',
	},
	{
		title: 'Produtos',
		link: RoutesEnum.PRODUCTS,
	},
	{
		title: 'Contato',
		link: RoutesEnum.CONTACT,
	}
];

export const Navbar: React.FunctionComponent<Props> = (props) => {
	const { window, } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const location = useLocation();

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
		<BoxSidebarMobile onClick={handleDrawerToggle} sx={{ textAlign: 'center', }}>
			<LinkUnstyled to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', padding: '1em 0', }} >
				<LogoImg component="img" src={Logo}/>
				<LogoTitle
					variant="h6"
					px={2}
				>
					SweetD
				</LogoTitle>
			</LinkUnstyled>

			<Divider />

			<List>
				{navItems.map((item) => (
					<LinkUnstyled key={item.title} to={item.link}>
						<NavItemMobile active={item.link === location.pathname}>
							<ListItemButton sx={{ textAlign: 'center', }}>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</NavItemMobile>
					</LinkUnstyled>
				))}
			</List>
		</BoxSidebarMobile>
	);

	const container = window !== undefined ? (): HTMLElement => window()?.document.body : undefined;

	return (
		<BoxArea>
			<CssBaseline />
			<AppBarCustom component="nav" scrolltrigger={scrollTrigger}>
				<Toolbar sx={{ display: 'flex', width: '100%', maxWidth: '1280px', }}>
					<IconButton
						color="inherit"
						aria-label="Abrir navbar"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: isMobile ? 'block' : 'none', }}
					>
						<MenuIcon />
					</IconButton>

					{!isMobile &&
					<>
						<LinkUnstyled to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', }} >
							<LogoImg component="img" src={Logo}/>
							<LogoTitle
								variant="h6"
								px={2}
							>
								SweetD
							</LogoTitle>
						</LinkUnstyled>

					
						<Box sx={{ display: 'flex', placeContent: 'center', width: '100%', flexGrow: 1, gap: 4, }}>
							{navItems.map((item) => (
								<LinkUnstyled key={item.title} to={item.link}>
									<NavItem active={item.link === location.pathname}>
										<Typography variant='body1'>
											{item.title}
										</Typography>
									</NavItem>
								</LinkUnstyled>
							))}
						</Box>
					</>
					}
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, minWidth: 'fit-content', }}>
						<LinkUnstyled to={RoutesEnum.CART}>
							<CartIcon />
						</LinkUnstyled>

						<Typography variant="body1">
							2
						</Typography>
						<Divider orientation="vertical" sx={(theme): any => ({
							height: '17px',
							backgroundColor: theme.palette.common.black,
						})}/>
						<Typography variant="body1" sx={{ mr: 1, }}>
							R$ 12,30
						</Typography>

						{!isMobile &&
						<>
							<LinkUnstyled to={RoutesEnum.LOGIN}>
								<LoginButton>
									<Face sx={{ mr: 1, }}/>
									Login
								</LoginButton>
							</LinkUnstyled>
						</>
						}
					</Box>
					
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
		</BoxArea>
	);
};