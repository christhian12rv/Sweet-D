import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Instagram, WhatsApp } from '@mui/icons-material';

export const BoxFooter = styled(Box)(({ theme, }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'flex-start',
	flexGrow: 1,
	backgroundColor: '#ffff !important',
	boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
	padding: '2em 0',
}));

type LogoImgProps = {
	component: string;
	src: any;
};

export const LogoImg = styled(Box)<LogoImgProps>(() => ({
	width: '60px',
}));

export const LogoTitle = styled(Typography)(({ theme, }) => ({
	color: theme.palette.secondary.main,
	fontWeight: 'bold',
}));

export const InstagramIcon = styled(Instagram)(({ theme, }) => ({
	fontSize: '28px',
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	cursor: 'pointer',
	transition: 'all .25s',
}));

export const WhatsAppIcon = styled(WhatsApp)(({ theme, }) => ({
	fontSize: '28px',
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	cursor: 'pointer',
	transition: 'all .25s',
}));