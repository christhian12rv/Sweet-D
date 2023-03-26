import { styled } from '@mui/system';
import { MaterialDesignContent } from 'notistack';

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme, }) => ({
	'&.notistack-MuiContent-success': {
		backgroundColor: 'pink',
	},
	'&.notistack-MuiContent-error': {
		flexWrap: 'nowrap !important',
		backgroundColor: '#d32f2f',
	},
}));