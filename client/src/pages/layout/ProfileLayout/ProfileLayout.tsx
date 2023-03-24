import { AccountCircleRounded, ChevronLeftRounded, ChevronRightRounded, LogoutRounded, MenuRounded, PowerSettingsNewRounded, ReceiptRounded } from '@mui/icons-material';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  Typography, CssBaseline, Grid, Toolbar, useMediaQuery, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import ScreenSizeQuerysEnum from '../../../types/enums/ScreenSizeQuerysEnum';
import { BoxArea, GridContainer, DrawerHeader,  DrawerStyled } from './ProfileLayout.styled';

type Props = {
	window?: () => Window;
}

export const ProfileLayout: React.FunctionComponent<Props> = (props) => {
	const { window, } = props;
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');
	const location = useLocation();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerOpen = (): void => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = (): void => {
		setDrawerOpen(false);
	};

	const handleDrawerToggle = (): void => {
		setDrawerOpen(!drawerOpen);
	};

	const container = window !== undefined ? (): HTMLElement => window()?.document.body : undefined;

	return (
		<BoxArea>
			<GridContainer gap={!isMobile ? '3em' : '1.5em'}>
				<CssBaseline/>
				{isMobile ?
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, }}
						>
							<MenuRounded />
						</IconButton>
					</Toolbar>
					: <></>}
				<Typography variant="h4" ml={!isMobile ? 7 : 'auto'} mr={!isMobile ? 0 : 'auto'} textAlign={!isMobile ? 'initial' : 'center'}>
							Minha Conta
				</Typography>

				{isMobile ? <Divider/> : <></>}

				<Grid display="flex" flexDirection={isMobile ? 'column': 'row'} sx={{
					gap: isMobile ? 0 : '3em',
					width: '100%',
					margin: '0 !important',
					padding: '0',
				}}>
					{!isMobile ?
						<DrawerStyled
							variant="permanent"
							open={drawerOpen}>
							<DrawerHeader sx={{ justifyContent: 'flex-end', }}>
								<IconButton onClick={handleDrawerToggle}>
									{drawerOpen ? <ChevronLeftRounded /> : <ChevronRightRounded />}
								</IconButton>
							</DrawerHeader>
							<Divider /> 
							<List>
								<LinkUnstyled to={RoutesEnum.PROFILE}>
									<ListItem disablePadding sx={(theme): object => ({
										display: 'block', color: location.pathname === RoutesEnum.PROFILE ? theme.palette.primary.dark : 'initial',
										'& .sidebarItemIcon': {
											color: location.pathname === RoutesEnum.PROFILE ? theme.palette.primary.dark : 'initial',
										},
									})}>
										<ListItemButton
											sx={{
												minHeight: 48,
												justifyContent: drawerOpen ? 'initial' : 'center',
												px: 2.5,
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: drawerOpen ? 3 : 'auto',
													justifyContent: 'center',
												}}
											>
												<AccountCircleRounded className="sidebarItemIcon"/>
											</ListItemIcon>
											<ListItemText primary="Perfil" sx={{ opacity: drawerOpen ? 1 : 0, }} />
										</ListItemButton>
									</ListItem>
								</LinkUnstyled>

								<LinkUnstyled to={RoutesEnum.ORDERS}>
									<ListItem disablePadding sx={(theme): object => ({
										display: 'block', color: location.pathname === RoutesEnum.ORDERS || location.pathname.startsWith(RoutesEnum.ORDER) ? theme.palette.primary.dark : 'initial',
										'& .sidebarItemIcon': {
											color: location.pathname === RoutesEnum.ORDERS || location.pathname.startsWith(RoutesEnum.ORDER) ? theme.palette.primary.dark : 'initial',
										},
									})}>
										<ListItemButton
											sx={{
												minHeight: 48,
												justifyContent: drawerOpen ? 'initial' : 'center',
												px: 2.5,
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: drawerOpen ? 3 : 'auto',
													justifyContent: 'center',
												}}
											>
												<ReceiptRounded className="sidebarItemIcon"/>
											</ListItemIcon>
											<ListItemText primary="Pedidos" sx={{ opacity: drawerOpen ? 1 : 0, }} />
										</ListItemButton>
									</ListItem>
								</LinkUnstyled>

								<ListItem disablePadding sx={{ display: 'block', }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: drawerOpen ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: drawerOpen ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<PowerSettingsNewRounded className="sidebarItemIcon"/>
										</ListItemIcon>
										<ListItemText primary="Logout" sx={{ opacity: drawerOpen ? 1 : 0, }} />
									</ListItemButton>
								</ListItem>
							</List>
						</DrawerStyled>

						:

						<Drawer
							container={container}
							variant="temporary"
							open={drawerOpen}
							onClose={drawerOpen ? handleDrawerClose : handleDrawerOpen}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
							sx={{
								display: isMobile ? 'block' : 'none',
								'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px', },
							}}>
							<DrawerHeader sx={{ justifyContent: 'center', }}>
								<Typography variant="h6">Minha Conta</Typography>
							</DrawerHeader>
							<Divider /> 
							<List>
								<LinkUnstyled to={RoutesEnum.PROFILE} onClick={handleDrawerClose}>
									<ListItem disablePadding sx={(theme): object => ({
										display: 'block', color: location.pathname === RoutesEnum.PROFILE ? theme.palette.primary.dark : 'initial',
										'& .sidebarItemIcon': {
											color: location.pathname === RoutesEnum.PROFILE ? theme.palette.primary.dark : 'initial',
										},
									})}>
										<ListItemButton
											sx={{
												minHeight: 48,
												justifyContent: drawerOpen ? 'initial' : 'center',
												px: 2.5,
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: drawerOpen ? 3 : 'auto',
													justifyContent: 'center',
												}}
											>
												<AccountCircleRounded className="sidebarItemIcon"/>
											</ListItemIcon>
											<ListItemText primary="Perfil" sx={{ opacity: drawerOpen ? 1 : 0, }} />
										</ListItemButton>
									</ListItem>
								</LinkUnstyled>

								<LinkUnstyled to={RoutesEnum.ORDERS} onClick={handleDrawerClose}>
									<ListItem disablePadding sx={(theme): object => ({
										display: 'block', color: location.pathname === RoutesEnum.ORDERS || location.pathname.startsWith(RoutesEnum.ORDER) ? theme.palette.primary.dark : 'initial',
										'& .sidebarItemIcon': {
											color: location.pathname === RoutesEnum.ORDERS || location.pathname.startsWith(RoutesEnum.ORDER) ? theme.palette.primary.dark : 'initial',
										},
									})}>
										<ListItemButton
											sx={{
												minHeight: 48,
												justifyContent: drawerOpen ? 'initial' : 'center',
												px: 2.5,
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: drawerOpen ? 3 : 'auto',
													justifyContent: 'center',
												}}
											>
												<ReceiptRounded className="sidebarItemIcon"/>
											</ListItemIcon>
											<ListItemText primary="Pedidos" sx={{ opacity: drawerOpen ? 1 : 0, }} />
										</ListItemButton>
									</ListItem>
								</LinkUnstyled>

								<ListItem disablePadding sx={{ display: 'block', }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: drawerOpen ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: drawerOpen ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<PowerSettingsNewRounded className="sidebarItemIcon"/>
										</ListItemIcon>
										<ListItemText primary="Logout" sx={{ opacity: drawerOpen ? 1 : 0, }} />
									</ListItemButton>
								</ListItem>
							</List>
						</Drawer>
					}

					<Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto', }}>
						<Outlet/>
					</Box>
				</Grid>
			</GridContainer>
		</BoxArea>
	);
};