import { Box, BoxProps, Card, CardActions, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { LinkUnstyled } from '../LinkUnstyled';

export const CardStyled = styled(Card)(({ theme, }) => ({
	borderRadius: '17.5px',
	boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px !important',
	width: '300px',
	transition: 'all .5s',
}));

export const CardContentStyled = styled(CardContent)(({ theme, }) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: 0,
}));

export const CardActionsStyled = styled(CardActions)(({ theme, }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	padding: '.5em 1em 1em 1em',
}));

export const BoxImg = styled(Box)(({ theme, }) => ({
	height: '160px',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
}));

export const Title = styled(Typography)(({ theme, }) => ({
	
}));

export const Price = styled(Typography)(({ theme, }) => ({
	color: theme.palette.primary.dark,
}));

export const Description = styled(Box)(({ theme, }) => ({
	color: theme.palette.grey[800],
	textAlign: 'justify',
}));

export const BoxActionIcon = styled(Box)(({ theme, }) => ({
}));

export const BoxActionLink = styled(LinkUnstyled)(({ theme, }) => ({
	color: theme.palette.grey[800] + ' !important',
	transition: 'all .25s',
	'&:hover': {
		color: theme.palette.primary.dark + ' !important',
	},
}));