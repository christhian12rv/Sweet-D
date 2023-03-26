import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { RequestType } from '../../store/types/global.store.types';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useNonInitialEffect } from './useNonInitialEffect';

export const useHandleSnackbarMessages = (request: RequestType, expectedStatus: number, successMessage: string, successNavigate: RoutesEnum): void => {
	const navigate = useNavigate();

	useNonInitialEffect(() => {
		closeSnackbar();
		if (request.status === expectedStatus) {
			enqueueSnackbar(successMessage, { variant: 'success', });
			navigate(successNavigate);
			return;
		} else if (request.status === 500) {
			navigate(RoutesEnum.ERROR_500);
			return;
		}
		
		if (request.errors) {
			request.errors.forEach(error => {
				enqueueSnackbar(error, { variant: 'error', });
			});
			return;
		}

		enqueueSnackbar(request.message, { variant: 'error', });
	}, [request]);
};