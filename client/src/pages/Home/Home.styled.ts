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
	alignItems: 'center',
	maxWidth: 1280,
	margin: '0 !important',
	padding: '0 !important',
}));