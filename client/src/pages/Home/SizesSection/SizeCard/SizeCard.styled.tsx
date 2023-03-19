import { Box, BoxProps, Card, CardProps, styled } from '@mui/material';

type CardStyledProps = {
	backgroundcolor: string;
} & CardProps;

export const CardStyled = styled(Card)<CardStyledProps>(({ backgroundcolor, theme, }) => ({
	backgroundColor: backgroundcolor,
	borderRadius: '17.5px',
	boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px !important',
	width: '170px',
	height: '170px',
	'&:hover': {
		boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
		transform: 'scale(1.1)',
		'& .boxImg': {
			transform: 'rotateZ(90deg)',
		},
	},
	transition: 'all .5s',
}));

type BoxImgProps = {
	src: any;
} & BoxProps;

export const BoxImg = styled(Box)<BoxImgProps>(({ theme, }) => ({
	backgroundColor: 'transparent',
	boxShadow: 'none',
	transition: 'all .5s',
}));