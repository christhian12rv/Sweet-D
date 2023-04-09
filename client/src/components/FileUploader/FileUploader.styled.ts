import { styled } from '@mui/system';
import { FilePond } from 'react-filepond';

export const FilePondStyled = styled(FilePond)(({ theme, }) => ({
	'& .filepond--item': {
		width: 'calc(33.33% - .5em)',
		height: '20vw !important',
	},
}));
