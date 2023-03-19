import { Box, Button, styled, Typography } from '@mui/material';

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