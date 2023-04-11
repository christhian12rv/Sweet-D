import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, Typography, Drawer, Divider, List, Menu, MenuItem, ListItemButton, ListItemText, useScrollTrigger,
	useMediaQuery, Tooltip, ListItemIcon, AccordionSummary, AccordionDetails, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../../../assets/img/Logo.png';
import { AppBarCustom, BoxArea, CartIcon, LogoImg, LogoTitle, NavItem, NavItemMobile, BoxSidebarMobile, AccordionSidebarMobile } from './Navbar.styled';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import ScreenSizeQuerysEnum from '../../../../types/enums/ScreenSizeQuerysEnum';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaceRounded, ReceiptRounded, ExpandMoreRounded, AccountCircleRounded, AdminPanelSettingsRounded, PowerSettingsNewRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useTypedSelector } from '../../../../store/utils/useTypedSelector';
import { logout as logoutAction } from '../../../../store/features/auth/auth.actions';
import { findAllByIds as findAllProductsBydIdsAction } from '../../../../store/features/products/products.actions';
import { fetchCart as fetchCartAction } from '../../../../store/features/cart/cart.actions';
import { useNonInitialEffect } from '../../../../utils/hooks/useNonInitialEffect';
import brlCurrencyFormatter from '../../../../utils/brlCurrencyFormatter';
import getTotalPriceOfProduct from '../../../../utils/getTotalPriceOfProduct';
import ProductType from '../../../../types/Product/ProductType';

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
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { user: loggedUser, logout, } = useTypedSelector((state) => state.auth);
	const { productsChoices, } = useTypedSelector((state) => state.cart);

	const [cartIsLoading, setCartIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openLoginDropdown = Boolean(anchorEl);

	const [expanded, setExpanded] = useState<string | false>('panel1');

	useNonInitialEffect(() => {
		if (logout)
			navigate('/');
	}, [logout]);

	const fetchProducts = async (): Promise<void> => {
		const [response, json] = await findAllProductsBydIdsAction(productsChoices.map(p => p.id));

		if (response.status === 500) {
			navigate(RoutesEnum.ERROR_500);
			return;
		}

		setProducts(json.products || []);
		
		setCartIsLoading(false);
	};

	useEffect(() => {
		setCartIsLoading(true);
		dispatch(fetchCartAction());
	}, []);

	useNonInitialEffect(() => {
		if (!productsChoices || productsChoices.length <= 0)
			return;

		fetchProducts();
	}, [productsChoices]);

	const handleLogout = (): void => {
		handleClose();
		if (mobileOpen)
			handleDrawerToggle();

		dispatch(logoutAction());
	};

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
		target: window !== undefined ? window() : undefined,
	});

	const handleDrawerToggle = (): void => {
		setMobileOpen((prevState) => !prevState);
	};
	
	const userLoggedBar = (
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
					<FaceRounded sx={{ width: 32, height: 32, mr: '5px', }}/>
					{loggedUser?.name.split(' ')[0]}
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
						'&:hover .profileAccountIcon': {
							color: theme.palette.primary.dark + ' !important',
						},
					})}>
						<AccountCircleRounded className="profileAccountIcon" sx={(theme): object => ({ color: theme.palette.grey[400], fontSize: '31px', mr: '8px', })} /> Perfil
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
						<ReceiptRounded className="receiptReceiptIcon" sx={(theme): object => ({ color: theme.palette.grey[400], fontSize: '31px', mr: '8px', })} /> Pedidos
					</MenuItem>
				</LinkUnstyled>
				<Divider />

				{loggedUser?.isAdmin &&
					<LinkUnstyled to={RoutesEnum.ADMIN_DASHBOARD}>
						<MenuItem onClick={handleClose} sx={(theme): object => ({
							'&:hover': {
								color: theme.palette.primary.dark + ' !important',
							},
							'&:hover .receiptReceiptIcon': {
								color: theme.palette.primary.dark + ' !important',
							},
						})}>
							<AdminPanelSettingsRounded className="receiptReceiptIcon" sx={(theme): object => ({ color: theme.palette.grey[400], fontSize: '31px', ml: '1px', mr: '7px', })} /> Painel Admin
						</MenuItem>
					</LinkUnstyled>
				}

				<MenuItem onClick={handleLogout} sx={(theme): object => ({
					'&:hover': {
						color: theme.palette.primary.dark + ' !important',
					},
					'&:hover .logoutIcon': {
						color: theme.palette.primary.dark + ' !important',
					},
				})}>
					<ListItemIcon>
						<PowerSettingsNewRounded className="logoutIcon" sx={(theme): object => ({ color: theme.palette.grey[400], fontSize: '29px', ml: '.5px', mr: '9.5px', })} />
					</ListItemIcon>
				Logout
				</MenuItem>
			</Menu>
		</>
	);

	const mobileUserLoggedBar = (
		<AccordionSidebarMobile disableGutters elevation={0} expanded={expanded === 'profile'} onChange={handleChange('profile')}>
			<AccordionSummary aria-controls="profiled-content" id="profiled-header" expandIcon={<ExpandMoreRounded/>}
				sx={(theme): object => ({
					'& .MuiAccordionSummary-content': {
						alignItems: 'center',
						pl: '13px',
					},
					color: expanded === 'profile' ? theme.palette.primary.dark : 'initial',
				})}>
				<FaceRounded sx={{ width: 32, height: 32, mr: '10px', }}/>
				<Typography sx={{ alignSelf: 'center', }}>
					{loggedUser?.name.split(' ')[0]}
				</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0, }}>
				<List >
					<LinkUnstyled to={RoutesEnum.PROFILE} onClick={handleDrawerToggle}>
						<ListItem disablePadding sx={(theme): object => ({
							'&:hover, &:hover .accordionAccoutCircleIcon': {
								color: theme.palette.primary.dark,
							},
							...(location.pathname === RoutesEnum.PROFILE && {
								color: theme.palette.primary.dark,
								'& .accordionAccoutCircleIcon': {
									color: theme.palette.primary.dark,
								},
							}),
							transition: 'color .25s !important',
						})}>
							<ListItemButton>
								<ListItemIcon sx={{ minWidth: '40px', }}>
									<AccountCircleRounded className="accordionAccoutCircleIcon" sx={{ transition: 'color .25s !important', }}/>
								</ListItemIcon>
								<ListItemText primary="Perfil" />
							</ListItemButton>
						</ListItem>
					</LinkUnstyled>

					<LinkUnstyled to={RoutesEnum.ORDERS} onClick={handleDrawerToggle}>
						<ListItem disablePadding sx={(theme): object => ({
							'&:hover, &:hover .accordionReceiptIcon': {
								color: theme.palette.primary.dark,
							},
							...(location.pathname === RoutesEnum.ORDERS && {
								color: theme.palette.primary.dark,
								'& .accordionReceiptIcon': {
									color: theme.palette.primary.dark,
								},
							}),
							transition: 'color .25s !important',
						})}>
							<ListItemButton>
								<ListItemIcon sx={{ minWidth: '40px', }}>
									<ReceiptRounded className="accordionReceiptIcon" sx={{ transition: 'color .25s !important', }}/>
								</ListItemIcon>
								<ListItemText primary="Pedidos" />
							</ListItemButton>
						</ListItem>
					</LinkUnstyled>

					{loggedUser?.isAdmin &&
						<LinkUnstyled to={RoutesEnum.ADMIN_DASHBOARD} onClick={handleDrawerToggle}>
							<ListItem disablePadding sx={(theme): object => ({
								'&:hover, &:hover .accordionAdminPannelIcon': {
									color: theme.palette.primary.dark,
								},
								transition: 'color .25s !important',
							})}>
								<ListItemButton>
									<ListItemIcon sx={{ minWidth: '40px', }}>
										<AdminPanelSettingsRounded className="accordionAdminPannelIcon" sx={{ transition: 'color .25s !important', }}/>
									</ListItemIcon>
									<ListItemText primary="Painel Admin" />
								</ListItemButton>
							</ListItem>
						</LinkUnstyled>
					}

					<ListItem disablePadding onClick={handleLogout} sx={(theme): object => ({
						'&:hover, &:hover .accordionLogoutIcon': {
							color: theme.palette.primary.dark,
						},
						transition: 'color .25s !important',
					})}>
						<ListItemButton>
							<ListItemIcon sx={{ minWidth: '40px', }}>
								<PowerSettingsNewRounded className="accordionLogoutIcon" sx={{ transition: 'color .25s !important', }}/>
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</ListItem>
				</List>
			</AccordionDetails>
		</AccordionSidebarMobile>
	);

	const mobileDrawer = (
		<BoxSidebarMobile sx={{ textAlign: 'center', }}>
			<LinkUnstyled to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', padding: '1em 0', }} onClick={handleDrawerToggle}>
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

			{loggedUser ? mobileUserLoggedBar : (

				<LinkUnstyled to={RoutesEnum.LOGIN} onClick={handleDrawerToggle}>
					<Typography className='login-text' variant="h6" sx={(theme): any => ({
						fontSize: '1.15em',
						padding: '10px 0',
						color: theme.palette.grey[900],
						'&:hover': {
							color: theme.palette.primary.dark,
						},
						transition: 'all .25s',
					})}>
					Login
					</Typography>
				</LinkUnstyled>
			)}

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
							{cartIsLoading ? 0 :
								productsChoices.reduce((sum, pc) => sum + pc.quantity, 0)
							}
						</Typography>
						<Divider orientation="vertical" sx={(theme): any => ({
							height: '17px',
							backgroundColor: theme.palette.common.black,
						})}/>
						<Typography variant="body1" sx={{ mr: 1, }}>
							{cartIsLoading ? 'R$ 0,00' :
								brlCurrencyFormatter.format(productsChoices.reduce((sum, pc) => sum + (getTotalPriceOfProduct(products.find(p => p.id === pc.id), pc)), 0))
							}
						</Typography>

						{!isMobile &&
						<>
							{loggedUser ? userLoggedBar : (
								<LinkUnstyled to={RoutesEnum.LOGIN}>
									<Typography variant="h6" sx={(theme): any => ({
										fontSize: '1.15em',
										color: theme.palette.grey[800],
										'&:hover': {
											color: theme.palette.primary.dark,
										},
										transition: 'all .25s',
									})}>
										Login
									</Typography>
								</LinkUnstyled>
							)}
							
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
					{mobileDrawer}
				</Drawer>
			</Box>
		</BoxArea>
	);
};