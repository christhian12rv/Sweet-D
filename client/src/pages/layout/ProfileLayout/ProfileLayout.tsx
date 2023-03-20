import { AccountCircleRounded, ChevronLeftRounded, ChevronRightRounded, LogoutRounded, MenuRounded, ReceiptRounded } from '@mui/icons-material';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  Typography, CssBaseline, Grid, Toolbar, useMediaQuery } from '@mui/material';
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

	const container = window !== undefined ? (): HTMLElement => window()?.document.body : undefined;

	useEffect((): any => {
		console.log(drawerOpen);
	}, [drawerOpen]);

	return (
		<BoxArea>
			<GridContainer>
				<CssBaseline/>
				<Typography variant="h4" ml={7}>Minha Conta</Typography>
				<Grid display="flex" flexDirection={isMobile ? 'column': 'row'} sx={{
					gap: '3em',
					width: '100%',
					margin: '0 !important',
					padding: '0',
				}}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
							sx={{ mr: 2, display: isMobile ? 'block' : 'none', }}
						>
							<MenuRounded />
						</IconButton>
					</Toolbar>
					<Box component="main" sx={{ flexGrow: 1, p: 3, }}>
						<DrawerHeader />
						<Outlet/>
					</Box>
				</Grid>
			</GridContainer>

			<Box component="nav">
				<DrawerStyled
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
					<Box>
							eae mano
					</Box>
					{/* <DrawerHeader>
						<IconButton onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}>
							{drawerOpen ? <ChevronRightRounded /> : <ChevronLeftRounded />}
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
								display: 'block', color: location.pathname === RoutesEnum.ORDERS ? theme.palette.primary.dark : 'initial',
								'& .sidebarItemIcon': {
									color: location.pathname === RoutesEnum.ORDERS ? theme.palette.primary.dark : 'initial',
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
									<LogoutRounded className="sidebarItemIcon"/>
								</ListItemIcon>
								<ListItemText primary="Logout" sx={{ opacity: drawerOpen ? 1 : 0, }} />
							</ListItemButton>
						</ListItem>
					</List> */}
				</DrawerStyled>
			</Box>
		</BoxArea>
	);
};