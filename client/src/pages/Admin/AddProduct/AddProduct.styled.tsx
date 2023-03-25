import { Grid, styled } from '@mui/material';

export const GridTextEditor = styled(Grid)(({ theme, }) => ({
	'& .MuiPaper-root:nth-of-type(2)': {
		backgroundColor: theme.palette.primary.main,
		boxShadow: 'none',
		border: 'none',
	},
	'& .MuiTypography-body1:nth-of-type(3)::-webkit-scrollbar': {
		width: '10px',
	},
	/* Track */
	'& .MuiTypography-body1:nth-of-type(3)::-webkit-scrollbar-track': {
		background: 'transparent',
		boxShadow: 'none',
	},
	/* Handle */
	'& .MuiTypography-body1:nth-of-type(3)::-webkit-scrollbar-thumb': {
		background: theme.palette.grey[300],
		boxShadow: 'none',
		borderRadius: '2px',
	},
	/* Handle on hover */
	'& .MuiTypography-body1:nth-of-type(3)::-webkit-scrollbar-thumb:hover': {
		background: '#555',
	},
}));