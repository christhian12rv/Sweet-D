import { CookieRounded, DashboardRounded, FaceRounded, FullscreenRounded, MenuRounded, PeopleRounded, PowerSettingsNewRounded, ReceiptRounded, SettingsRounded } from '@mui/icons-material';
import { CssBaseline, Toolbar, IconButton, Typography, List, ListItemButton, ListItemIcon, ListItemText, Box, Drawer, useMediaQuery, AppBar, Container, Slide, useScrollTrigger, Divider, Avatar, Grid } from '@mui/material';
import React, { useState } from 'react';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import { LogoImg, LogoTitle } from '../../../layout/MainLayout/Footer/Footer.styled';
import { AppBarStyled, AppBarMobileStyled, BoxArea, DrawerHeader, DrawerStyled, GridContainer, SidebarListItemStyled, DrawerMobileStyled } from './MainLayout.styled';
import Logo from '../../../../assets/img/Logo.png';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import { Outlet, useLocation } from 'react-router-dom';
import ScreenSizeQuerysEnum from '../../../../types/enums/ScreenSizeQuerysEnum';
import LocalStorageEnum from '../../../../types/enums/LocalStorageEnum';

type Props = {
  window?: () => Window;
}

export const MainLayout: React.FunctionComponent<Props> = ({ window, }) => {
	const location = useLocation();
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');
	const [openSidebar, setOpenSidebar] = useState(!isMobile ? localStorage.getItem(LocalStorageEnum.ADMIN_SIDEBAR_OPEN) === 'true' : false);
	const [fullscreen, setFullscreen] = useState(false);

	const container = window !== undefined ? (): any => window().document.body : undefined;

	const handleToggleFullScreen = (): void => {
		if (!fullscreen)
			document.body.requestFullscreen();
		else
			document.exitFullscreen();

		setFullscreen(!fullscreen);
	};

	const handleDrawerOpenSidebar = (): void => {
		setOpenSidebar(true);
		localStorage.setItem(LocalStorageEnum.ADMIN_SIDEBAR_OPEN, 'true');
	};

	const handleDrawerCloseSidebar = (): void => {
		setOpenSidebar(false);
		localStorage.setItem(LocalStorageEnum.ADMIN_SIDEBAR_OPEN, 'false');
	};

	const drawer = (
		<>
			<DrawerHeader>
				<LinkUnstyled to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', padding: '1em 0', }} >
					<LogoImg component="img" src={Logo} sx={{ width: openSidebar || isMobile ? 50 : 40, }}/>
					{openSidebar || isMobile ? (
						<LogoTitle
							variant="h6"
							px={2}
						>
									SweetD
						</LogoTitle>
					) : <></>}
				</LinkUnstyled>
			</DrawerHeader>
			<List sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, height: '100%', }}>
				<LinkUnstyled to={RoutesEnum.ADMIN_DASHBOARD}>
					<SidebarListItemStyled disablePadding active={location.pathname === RoutesEnum.ADMIN_DASHBOARD} open={openSidebar}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: openSidebar ? 'initial' : 'center',
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openSidebar ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<DashboardRounded sx={(theme): object => ({ color: location.pathname === RoutesEnum.ADMIN_DASHBOARD ? theme.palette.primary.dark : theme.palette.grey[800], })} />
							</ListItemIcon>
							<ListItemText primary="Dashboard" sx={{ opacity: openSidebar ? 1 : 0, }} />
						</ListItemButton>
					</SidebarListItemStyled>
				</LinkUnstyled>

				<LinkUnstyled to={RoutesEnum.ADMIN_PRODUCTS}>
					<SidebarListItemStyled disablePadding active={location.pathname === RoutesEnum.ADMIN_PRODUCTS || location.pathname === RoutesEnum.ADMIN_ADD_PRODUCT} open={openSidebar}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: openSidebar ? 'initial' : 'center',
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openSidebar ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<CookieRounded sx={(theme): object => ({ color: location.pathname === RoutesEnum.ADMIN_PRODUCTS || location.pathname === RoutesEnum.ADMIN_ADD_PRODUCT ? theme.palette.primary.dark : theme.palette.grey[800], })} />
							</ListItemIcon>
							<ListItemText primary="Produtos" sx={{ opacity: openSidebar ? 1 : 0, }} />
						</ListItemButton>
					</SidebarListItemStyled>
				</LinkUnstyled>

				<LinkUnstyled to={RoutesEnum.ADMIN_ORDERS}>
					<SidebarListItemStyled disablePadding active={location.pathname === RoutesEnum.ADMIN_ORDERS} open={openSidebar}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: openSidebar ? 'initial' : 'center',
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openSidebar ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<ReceiptRounded sx={(theme): object => ({ color: location.pathname === RoutesEnum.ADMIN_ORDERS ? theme.palette.primary.dark : theme.palette.grey[800], })} />
							</ListItemIcon>
							<ListItemText primary="Pedidos" sx={{ opacity: openSidebar ? 1 : 0, }} />
						</ListItemButton>
					</SidebarListItemStyled>
				</LinkUnstyled>

				<LinkUnstyled to={RoutesEnum.ADMIN_USERS}>
					<SidebarListItemStyled disablePadding active={location.pathname === RoutesEnum.ADMIN_USERS} open={openSidebar}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: openSidebar ? 'initial' : 'center',
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openSidebar ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<PeopleRounded sx={(theme): object => ({ color: location.pathname === RoutesEnum.ADMIN_USERS ? theme.palette.primary.dark : theme.palette.grey[800], })} />
							</ListItemIcon>
							<ListItemText primary="Usuários" sx={{ opacity: openSidebar ? 1 : 0, }} />
						</ListItemButton>
					</SidebarListItemStyled>
				</LinkUnstyled>

				<Divider sx={{ marginTop: 'auto', }}/>

				<LinkUnstyled to={RoutesEnum.ADMIN_USERS}>
					<SidebarListItemStyled disablePadding active={location.pathname === RoutesEnum.ADMIN_USERS} open={openSidebar}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: openSidebar ? 'initial' : 'center',
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openSidebar ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<SettingsRounded sx={(theme): object => ({ color: location.pathname === RoutesEnum.ADMIN_USERS ? theme.palette.primary.dark : theme.palette.grey[800], })} />
							</ListItemIcon>
							<ListItemText primary="Configurações" sx={{ opacity: openSidebar ? 1 : 0, }} />
						</ListItemButton>
					</SidebarListItemStyled>
				</LinkUnstyled>

				<LinkUnstyled to={RoutesEnum.ADMIN_USERS}>
					<SidebarListItemStyled disablePadding active={location.pathname === RoutesEnum.ADMIN_USERS} open={openSidebar}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: openSidebar ? 'initial' : 'center',
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openSidebar ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<PowerSettingsNewRounded sx={(theme): object => ({ color: location.pathname === RoutesEnum.ADMIN_USERS ? theme.palette.primary.dark : theme.palette.grey[800], })} />
							</ListItemIcon>
							<ListItemText primary="Logout" sx={{ opacity: openSidebar ? 1 : 0, }} />
						</ListItemButton>
					</SidebarListItemStyled>
				</LinkUnstyled>
			</List>
		</>
	);

	const appBarContent = (
		<>
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={openSidebar ? handleDrawerCloseSidebar : handleDrawerOpenSidebar}
				edge="start"
				sx={{
					marginRight: 1,
				}}
			>
				<MenuRounded />
			</IconButton>
			<IconButton
				color="inherit"
				aria-label="toggle fullscreen"
				edge="start"
				onClick={handleToggleFullScreen}
				sx={{
					marginRight: 5,
				}}
			>
				<FullscreenRounded />
			</IconButton>
			<LinkUnstyled to={RoutesEnum.PROFILE} style={{ marginLeft: 'auto', }}>
				<Grid display="flex" alignItems="center" justifyContent="center" sx={(theme): object => ({
					'&:hover .user-icon, &:hover .user-name, &:hover .admin-text': {
						color: theme.palette.primary.dark,
						transition: 'all .15s',
					},
				})}>
					<FaceRounded className="user-icon" sx={(theme): object => ({ fontSize: '2em', color: theme.palette.grey[900], transition: 'all .15s', })} />
					<Grid display="flex" flexDirection="column"  justifyContent="center">
						<Typography className="user-name" variant="h6" sx={(theme): object => ({ fontSize: '.95em', fontWeight: 'bold', color: theme.palette.grey[900], ml: 2, lineHeight: 1, transition: 'all .15s', })}>Christhian</Typography>
						<Typography className="admin-text" variant="body1" sx={{ fontSize: '.8em', ml: 2, transition: 'all .25s', }}>Admin</Typography>
					</Grid>
				</Grid>
			</LinkUnstyled>
		</>
	);

	type HideOnScroll = {
		window?: () => Window;
		children: React.ReactElement;
	}

	const HideOnScroll = (props: HideOnScroll): any => {
		const { children, window, } = props;
		
		const trigger = useScrollTrigger({
			target: window ? window() : undefined,
		});
	
		return (
			<Slide appear={false} direction="down" in={!trigger || openSidebar}>
				{children}
			</Slide>
		);
	};

	const HideAppBarMobile = (props: Props): any => {
		return (
			<React.Fragment>
				<CssBaseline />
				<HideOnScroll {...props}>
					<AppBarMobileStyled  open={openSidebar}>
						<Toolbar>
							{appBarContent}
						</Toolbar>
					</AppBarMobileStyled>
				</HideOnScroll>
				<Toolbar />
				{/* <Container>
					
				</Container> */}
			</React.Fragment>
		);
	};
	
	return (
		<BoxArea>
			<GridContainer flexDirection={isMobile ? 'column' : 'row'}>
				<CssBaseline />
				<AppBarStyled position="fixed" open={openSidebar} sx={{
					display: !isMobile ? 'block' : 'none',
				}}>
					<Toolbar>
						{appBarContent}
					</Toolbar>
				</AppBarStyled>
				
				{ isMobile ? <HideAppBarMobile window={window} /> : <></> }
				
				<DrawerMobileStyled
					container={container}
					variant="temporary"
					open={openSidebar}
					onClose={openSidebar ? handleDrawerCloseSidebar : handleDrawerOpenSidebar}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: isMobile ? 'block' : 'none',
					}}
				>
					{drawer}
				</DrawerMobileStyled>
				<DrawerStyled variant="permanent" open={openSidebar} sx={{
					display: !isMobile ? 'block' : 'none',
				}}>
					{drawer}
				</DrawerStyled>
				<Box sx={{ flexGrow: 1, overflowX: 'hidden',  }}>
					{!isMobile ? <DrawerHeader /> : <></>}
					<Box sx={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', overflowX: 'hidden', pb: 5, px: 3, }}>
						<Outlet/>
					</Box>
				</Box>
			</GridContainer>
		</BoxArea>
	);
};