import { styled } from '@mui/material';
import { Instagram, WhatsApp } from '@mui/icons-material';

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