import { CookieRounded, MenuRounded, PeopleRounded, ReceiptRounded } from '@mui/icons-material';
import { CssBaseline, Toolbar, IconButton, Typography, List, ListItemButton, ListItemIcon, ListItemText, Box, Drawer, useMediaQuery, AppBar, Container, Slide, useScrollTrigger } from '@mui/material';
import React from 'react';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import { LogoImg, LogoTitle } from '../../../layout/MainLayout/Footer/Footer.styled';
import { AppBarStyled, AppBarMobileStyled, BoxArea, DrawerHeader, DrawerStyled, GridContainer, SidebarListItemStyled, DrawerMobileStyled } from './MainLayout.styled';
import Logo from '../../../../assets/img/Logo.png';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import { useLocation } from 'react-router-dom';
import ScreenSizeQuerysEnum from '../../../../types/enums/ScreenSizeQuerysEnum';

type Props = {
  window?: () => Window;
}

export const MainLayout: React.FunctionComponent<Props> = ({ window, }) => {
	const location = useLocation();
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');
	const [openSidebar, setOpenSidebar] = React.useState(localStorage.getItem('adminSidebarOpen') === 'true');

	const container = window !== undefined ? (): any => window().document.body : undefined;

	const handleDrawerOpenSidebar = (): void => {
		setOpenSidebar(true);
		localStorage.setItem('adminSidebarOpen', 'true');
	};

	const handleDrawerCloseSidebar = (): void => {
		setOpenSidebar(false);
		localStorage.setItem('adminSidebarOpen', 'false');
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
			<List sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, }}>
				<LinkUnstyled to={RoutesEnum.ADMIN_PRODUCTS}>
					<SidebarListItemStyled disablePadding active={location.pathname === RoutesEnum.ADMIN_PRODUCTS} open={openSidebar}>
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
								<CookieRounded sx={(theme): object => ({ color: location.pathname === RoutesEnum.ADMIN_PRODUCTS ? theme.palette.primary.dark : theme.palette.grey[800], })} />
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
			</List>
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
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={openSidebar ? handleDrawerCloseSidebar : handleDrawerOpenSidebar}
								edge="start"
								sx={{
									marginRight: 5,
								}}
							>
								<MenuRounded />
							</IconButton>
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
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={openSidebar ? handleDrawerCloseSidebar : handleDrawerOpenSidebar}
							edge="start"
							sx={{
								marginRight: 5,
							}}
						>
							<MenuRounded />
						</IconButton>
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
				<Box component="main" sx={{ flexGrow: 1, px: 3, }}>
					{!isMobile ? <DrawerHeader /> : <></>}
					<Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
					</Typography>
					<Typography variant="body1">
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
					</Typography>
				</Box>
			</GridContainer>
		</BoxArea>
	);
};