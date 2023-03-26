import { Dispatch } from 'redux';
import { AuthAction, AuthActionsTypes } from './auth.types';

export const login = (): (dispatch: Dispatch<AuthAction>) => Promise<void> => {
	return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
		dispatch({ type: AuthActionsTypes.LOGIN_PENDING, });

		const response = await fetch('/api/users/login');
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: AuthActionsTypes.LOGIN_SUCCESS,
				payload: {
					user: json.user,
					token: json.token,
					request: {
						success: true,
						status: response.status,
						message: json.message,
						errors: null,
					},
				},
			});
			return;
		}

		dispatch({
			type: AuthActionsTypes.LOGIN_FAIL,
			payload: {
				user: null,
				request: {
					success: true,
					status: response.status,
					message: json.message,
					errors: json.errors ?? null,
				},
			},
		});
	};
};