import { Close } from '@mui/icons-material';
import { Accordion, Box, FormControl, Grid, styled } from '@mui/material';

export const BoxArea = styled(Box)(() => ({
	position: 'relative',
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

export const BoxModal = styled(Box)(() => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	display: 'flex',
	flexDirection: 'column',
	width: 400,
	backgroundColor: '#ffff',
	borderRadius: '17.5px',
	boxShadow: '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
	padding: '1em 0',
	maxWidth: '90vw',
}));

export const CloseModalIcon = styled(Close)(({ theme, }) => ({
	cursor: 'pointer',
	'&:hover': {
		color: theme.palette.primary.dark,
	},
	transition: 'all .25s',
}));

export const FormAccordionStyled = styled(Accordion)(({ theme, }) => ({
	boxShadow: 'none',
	padding: '.35em 0',
}));

export const FormControlStyled = styled(FormControl)(({ theme, }) => ({
	overflowY: 'auto',
	maxHeight: '80vh',
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