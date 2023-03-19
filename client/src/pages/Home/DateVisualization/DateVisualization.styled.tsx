import { Box, styled, Typography } from '@mui/material';

export const CardBox = styled(Box)(({ theme, }) => ({
	borderRadius: '17.5px',
	boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px !important',
}));

export const Title = styled(Typography)(({ theme, }) => ({
	fontSize: '2em',
}));