import { Box, Button, List, styled, Typography } from '@mui/material';

export const BoxImg = styled(Box)(() => ({
	width: '120px',
	height: '120px',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	borderRadius: '17.5px',
}));

export const Title = styled(Typography)(({ theme, }) => ({
	fontSize: '1.2em',
}));

export const IngredientsList = styled(List)(({ theme, }) => ({
	maxHeight: '200px',
	overflow: 'auto',
	padding: 0,
	'&::-webkit-scrollbar': {
		width: '10px',
	},
	/* Track */
	'&::-webkit-scrollbar-track': {
		background: 'transparent',
		boxShadow: 'none',
	},
	/* Handle */
	'&::-webkit-scrollbar-thumb': {
		background: theme.palette.grey[300],
		boxShadow: 'none',
		borderRadius: '2px',
	},
	/* Handle on hover */
	'&::-webkit-scrollbar-thumb:hover': {
		background: '#555',
	},
}));