import { Box, Grid, styled } from '@mui/material';


export const BoxArea = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	minHeight: 400,
	alignItems: 'center',
	justifyContent: 'center',
	margin: '0 !important',
	padding: '1em !important',
}));

export const GridContainer = styled(Grid)(() => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	gap: '3em',
	maxWidth: 1280,
	width: '100%',
	margin: '0 !important',
	padding: '3em 1em',
}));