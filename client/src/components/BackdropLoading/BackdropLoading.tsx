import { Backdrop, BackdropProps, CircularProgress } from '@mui/material';
import React from 'react';

export const BackdropLoading: React.FunctionComponent<BackdropProps> = (props) => {
	return (
		<Backdrop {...props} sx={{ position: 'absolute', zIndex: 999, borderRadius: '5px', }}>
			<CircularProgress size={24}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginTop: '-12px',
					marginLeft: '-12px',
				}}/>
		</Backdrop>
	);
};