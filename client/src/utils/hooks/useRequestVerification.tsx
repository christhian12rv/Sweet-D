import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { RequestType } from '../../store/types/global.store.types';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useNonInitialEffect } from './useNonInitialEffect';

type UseRequestVerificationType = {
	request: RequestType | null;
	type?: {
		expectedType: string;
		actualType: string | null;
	},
	successMessage?: string;
	successNavigate?: RoutesEnum | '/';
}

export const useRequestVerification = ({ request, type, successMessage, successNavigate, }: UseRequestVerificationType): void => {
	const navigate = useNavigate();

	useNonInitialEffect(() => {
		closeSnackbar();

		const typeVerified = type ? type.expectedType === type.actualType : null;

		if (request) {
			if (request.success && (typeVerified !== null ? typeVerified : true)) {
				if (successMessage)
					enqueueSnackbar(successMessage, { variant: 'success', });
				if (successNavigate)
					navigate(successNavigate);
				return;
			} else if (request.status === 500) {
				navigate(RoutesEnum.ERROR_500);
				return;
			}
		}
	}, [request]);
};