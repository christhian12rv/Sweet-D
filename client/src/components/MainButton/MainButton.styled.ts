import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

type Props = {
	design?: 'square' | 'rounded' | undefined;
} & ButtonProps;

export const ButtonStyled = styled(Button)<Props>(({ theme, design, }) => ({
	...(design && design == 'rounded' && { borderRadius: '20px', }) ,
	backgroundColor: theme.palette.primary.light,
	color: theme.palette.secondary.main,
	fontWeight: 'bold',
	textDecoration: 'none !important',
	textTransform: 'initial',
	padding: '.5em 1.5em',
	'&:hover': {
		backgroundColor: theme.palette.primary.main,
	},
	transition: '.5s all',
	fontSize: '.9em',
	height: '39.5px',
}));
