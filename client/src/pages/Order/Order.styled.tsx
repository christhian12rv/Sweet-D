import { Box, Grid, styled } from '@mui/material';

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