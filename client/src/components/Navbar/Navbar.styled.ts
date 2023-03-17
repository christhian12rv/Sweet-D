import { Storefront } from '@mui/icons-material';
import { AppBar, Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

type AppBarProps = {
	component: string;
	scrollTrigger: boolean;
}

export const AppBarCustom = styled(AppBar)<AppBarProps>(({ scrollTrigger, }) => ({
	padding: '.75em',
	backgroundColor:  scrollTrigger ? 'red !important' : 'transparent !important',
	boxShadow: 'none !important',
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
	color: theme.palette.common.black,
	fontWeight: 'bold',
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	transition: 'all .25s',
}));

export const NavItem = styled(Button)(({ theme, }) => ({
	color: theme.palette.common.black,
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