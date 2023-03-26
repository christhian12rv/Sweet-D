import { CloseRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import React from 'react';
import { StyledMaterialDesignContent } from './SnackbarProviderCustom.styled';

export const SnackbarProviderCustom: React.FunctionComponent = () => {
	return (
		<SnackbarProvider
			autoHideDuration={10000}
			Components={{
				error: StyledMaterialDesignContent,
			}}
			maxSnack={10}
			anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
			action={(snackbarId): any => (
				<IconButton
					color="inherit"
					aria-label="delete size"
					edge="start"
					onClick={(): any => closeSnackbar(snackbarId)}
				>
					<CloseRounded />
				</IconButton>
			)}/>
	);
};