import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, Typography, Drawer, Divider, List, Menu, MenuItem, ListItemButton, ListItemText, useScrollTrigger,
	useMediaQuery, Tooltip, ListItemIcon, Avatar, AccordionSummary, AccordionDetails, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../../../assets/img/Logo.png';
import { AppBarCustom, BoxArea, CartIcon, LogoImg, LogoTitle, NavItem, LoginButton, NavItemMobile, BoxSidebarMobile, AccordionSidebarMobile } from './Navbar.styled';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import ScreenSizeQuerysEnum from '../../../../types/enums/ScreenSizeQuerysEnum';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import { useLocation } from 'react-router-dom';
import { FaceRounded, LogoutRounded, ReceiptRounded, ExpandMoreRounded, AccountCircleRounded } from '@mui/icons-material';

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
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openLoginDropdown = Boolean(anchorEl);

	const [expanded, setExpanded] = React.useState<string | false>('panel1');

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (): void => {
		setAnchorEl(null);
	};

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
		<BoxSidebarMobile sx={{ textAlign: 'center', }}>
			<LinkUnstyled to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', padding: '1em 0', }} onClick={handleDrawerToggle} >
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
					<LinkUnstyled key={item.title} to={item.link} onClick={handleDrawerToggle}>
						<NavItemMobile active={item.link === location.pathname}>
							<ListItemButton sx={{ textAlign: 'center', }}>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</NavItemMobile>
					</LinkUnstyled>
				))}
			</List>

			<Divider/>

			<AccordionSidebarMobile disableGutters elevation={0} expanded={expanded === 'profile'} onChange={handleChange('profile')}>
				<AccordionSummary aria-controls="profiled-content" id="profiled-header" expandIcon={<ExpandMoreRounded/>}
					sx={(theme): object => ({
						'& .MuiAccordionSummary-content': {
							alignItems: 'center',
							justifyContent: 'center',
						},
						color: expanded === 'profile' ? theme.palette.primary.dark : 'initial',
					})}>
					<FaceRounded sx={{ width: 32, height: 32, mr: 0.7, }}/>
					<Typography sx={{ alignSelf: 'center', }}>
						Christhian
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<List >
						<LinkUnstyled to={RoutesEnum.PROFILE}>
							<ListItem disablePadding sx={(theme): object => ({
								'&:hover, &:hover .accordionAccoutCircleIcon': {
									color: theme.palette.primary.dark,
								},
								transition: 'color .25s !important',
							})}>
								<ListItemButton sx={{ paddingLeft: '41px', }}>
									<ListItemIcon>
										<AccountCircleRounded className="accordionAccoutCircleIcon" sx={{ transition: 'color .25s !important', }}/>
									</ListItemIcon>
									<ListItemText primary="Perfil" />
								</ListItemButton>
							</ListItem>
						</LinkUnstyled>

						<LinkUnstyled to={RoutesEnum.ORDERS}>
							<ListItem disablePadding sx={(theme): object => ({
								'&:hover, &:hover .accordionReceiptIcon': {
									color: theme.palette.primary.dark,
								},
								transition: 'color .25s !important',
							})}>
								<ListItemButton sx={{ paddingLeft: '41px', }}>
									<ListItemIcon>
										<ReceiptRounded className="accordionReceiptIcon" sx={{ transition: 'color .25s !important', }}/>
									</ListItemIcon>
									<ListItemText primary="Pedidos" />
								</ListItemButton>
							</ListItem>
						</LinkUnstyled>

						<ListItem disablePadding sx={(theme): object => ({
							'&:hover, &:hover .accordionLogoutIcon': {
								color: theme.palette.primary.dark,
							},
							transition: 'color .25s !important',
						})}>
							<ListItemButton sx={{ paddingLeft: '41px', }}>
								<ListItemIcon>
									<LogoutRounded className="accordionLogoutIcon" sx={{ transition: 'color .25s !important', }}/>
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</List>
				</AccordionDetails>
			</AccordionSidebarMobile>

			<Divider/>
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
							<Tooltip title="Configurações da Conta" >
								<IconButton
									sx={(theme): object => ({
										ml: 2,
										borderRadius: '5px !important',
										'&:hover': {
											color: theme.palette.primary.dark,
										},
										transition: 'all .25s',
									})}
									onClick={handleClick}
									size="small"
									aria-controls={openLoginDropdown ? 'account-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={openLoginDropdown  ? 'true' : undefined}
								>
									<FaceRounded sx={{ width: 32, height: 32, mr: 0.7, }}/>
									Christhian
								</IconButton>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								id="account-menu"
								open={openLoginDropdown}
								disableScrollLock={true}
								onClose={handleClose}
								onClick={handleClose}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: 'visible',
										filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
										mt: 1.5,
										'& .MuiAvatar-root': {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										'&:before': {
											content: '""',
											display: 'block',
											position: 'absolute',
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: 'background.paper',
											transform: 'translateY(-50%) rotate(45deg)',
											zIndex: 0,
										},
									},
								}}
								transformOrigin={{ horizontal: 'right', vertical: 'top', }}
								anchorOrigin={{ horizontal: 'right', vertical: 'bottom', }}
							>
								<LinkUnstyled to={RoutesEnum.PROFILE}>
									<MenuItem onClick={handleClose} sx={(theme): object => ({
										'&:hover': {
											color: theme.palette.primary.dark + ' !important',
										},
										'&:hover .profileAvatarIcon': {
											backgroundColor: theme.palette.primary.dark + ' !important',
										},
									})}>
										<Avatar className="profileAvatarIcon"/> Perfil
									</MenuItem>
								</LinkUnstyled>
								<LinkUnstyled to={RoutesEnum.ORDERS}>
									<MenuItem onClick={handleClose} sx={(theme): object => ({
										'&:hover': {
											color: theme.palette.primary.dark + ' !important',
										},
										'&:hover .receiptReceiptIcon': {
											color: theme.palette.primary.dark + ' !important',
										},
									})}>
										<ReceiptRounded className="receiptReceiptIcon" sx={{ color: '#bdbdbd', fontSize: '32px', ml: '-4px', mr: '8px', }} /> Pedidos
									</MenuItem>
								</LinkUnstyled>
								<Divider />
								<MenuItem onClick={handleClose} sx={(theme): object => ({
									'&:hover': {
										color: theme.palette.primary.dark + ' !important',
									},
									'&:hover .logoutLogoutIcon': {
										color: theme.palette.primary.dark + ' !important',
									},
								})}>
									<ListItemIcon>
										<LogoutRounded className="logoutLogoutIcon" fontSize="small" />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
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