import { Box, styled, Typography } from '@mui/material';

export const CardBox = styled(Box)(({ theme, }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#ffff',
	borderRadius: '17.5px',
	boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px !important',
	padding: '1em',
}));

export const Title = styled(Typography)(({ theme, }) => ({
	fontSize: '2em',
}));