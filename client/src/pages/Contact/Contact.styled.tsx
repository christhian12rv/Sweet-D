import { EmailRounded, Instagram, WhatsApp } from '@mui/icons-material';
import { Box, Grid, styled } from '@mui/material';

export const BoxArea = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
	minHeight: 400,
	alignItems: 'center',
	justifyContent: 'center',
	margin: '0 !important',
	padding: '0 !important',
}));

export const GridContainer = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '3em',
	alignItems: 'center',
	justifyContent: 'center',
	maxWidth: 1280,
	width: '100%',
	margin: '0 !important',
	padding: '3em 1em',
}));

export const CardBox = styled(Box)(({ theme, }) => ({
	backgroundColor: '#ffff',
	borderRadius: '17.5px',
	boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px !important',
}));

export const EmailIcon = styled(EmailRounded)(({ theme, }) => ({
	color: theme.palette.grey[500],
	fontSize: '6em',
}));

export const InstagramIcon = styled(Instagram)(({ theme, }) => ({
	fontSize: '38px',
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	cursor: 'pointer',
	transition: 'all .25s',
}));

export const WhatsAppIcon = styled(WhatsApp)(({ theme, }) => ({
	fontSize: '38px',
	'&:hover': {
		color: theme.palette.primary.darker,
	},
	cursor: 'pointer',
	transition: 'all .25s',
}));