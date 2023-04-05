import { Storefront } from '@mui/icons-material';
import { Accordion, AppBar, Box, Button, ButtonProps, Grid, ListItem, ListItemProps, Typography } from '@mui/material';
import { styled } from '@mui/system';

type AppBarProps = {
	component: string;
	scrolltrigger: boolean;
}

export const AppBarCustom = styled(AppBar)<AppBarProps>(({ theme, scrolltrigger, }) => ({
	left: '50% !important',
	transform: 'translate(-50%, 0)',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '.75em',
	backgroundColor:  scrolltrigger ? 'white !important' : 'transparent !important',
	boxShadow: scrolltrigger ? '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important' : 'none !important',
}));

type LogoImgProps = {
	component: string;
	src: any;
};

export const LogoImg = styled(Box)<LogoImgProps>(() => ({
	width: '60px',
}));

export const BoxArea = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: '0 !important',
	padding: '0 !important',
}));

export const GridContainer = styled(Grid)(() => ({
	display: 'flex',
	alignItems: 'center',
	maxWidth: 1280,
	margin: '0 !important',
	padding: '0 !important',
}));

export const LogoTitle = styled(Typography)(({ theme, }) => ({
	color: theme.palette.secondary.main,
	fontWeight: 'bold',
}));

export const CartIcon = styled(Storefront)(({ theme, }) => ({
	marginTop: '5px',
	color: theme.palette.primary.dark,
	fontWeight: 'bold',
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	transition: 'all .25s',
}));

type NavItemProps = {
	active: boolean;
} & ButtonProps;

export const NavItem = styled(Button, { shouldForwardProp: (prop) => prop !== 'active', })<NavItemProps>(({ active, theme, }) => ({
	color: !active ? theme.palette.common.black : theme.palette.primary.dark,
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	transition: 'all .25s',
}));

type NavItemMobileProps = {
	active: boolean;
} & ListItemProps;

export const NavItemMobile = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'active', })<NavItemMobileProps>(({ active, theme, }) => ({
	color: !active ? theme.palette.common.black : theme.palette.primary.dark,
	padding: 0,
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	transition: 'all .25s',
}));

export const LoginButton = styled(Button)(({ theme, }) => ({
	color: theme.palette.common.black,
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	transition: 'all .25s',
}));

export const BoxSidebarMobile = styled(Box)(({ theme, }) => ({
	textAlign: 'center',
	backgroundColor: '#ffff',
	height: '100%',
}));

export const AccordionSidebarMobile = styled(Accordion)(({ theme, }) => ({
	backgroundColor: 'transparent',
	boxShadow: 'none',
}));