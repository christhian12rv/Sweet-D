import { Close } from '@mui/icons-material';
import { Box, FormControl } from '@mui/material';
import { styled } from '@mui/system';

export const BoxDialog = styled(Box)(({ theme, }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: 400,
	padding: '1em',
	maxWidth: '80vw',
	'&::-webkit-scrollbar': {
		width: '10px',
	},
	'&::-webkit-scrollbar-track': {
		background: '#f1f1f1',
	},
	'&::-webkit-scrollbar-thumb': {
		background: theme.palette.grey[400],
	},
	'&::-webkit-scrollbar-thumb:hover': {
		background: '#555',
	},
}));

export const FormControlStyled = styled(FormControl)(({ theme, }) => ({
	gap: 5,
}));

export const CloseDialogIcon = styled(Close)(({ theme, }) => ({
	cursor: 'pointer',
	'&:hover': {
		color: theme.palette.primary.dark,
	},
	transition: 'all .25s',
}));