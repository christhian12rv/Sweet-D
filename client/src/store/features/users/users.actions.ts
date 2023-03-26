import { Dispatch } from 'redux';
import UserRegisterType from '../../../types/User/UserRegisterType';
import { UsersAction, UsersActionsTypes } from './users.types';

export const register = (user: UserRegisterType): (dispatch: Dispatch<UsersAction>) => Promise<void> => {
	return async (dispatch: Dispatch<UsersAction>): Promise<void> => {
		dispatch({ type: UsersActionsTypes.REGISTER_PENDING, });

		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ ...user, }),
			headers: { 'Content-type': 'application/json; charset=UTF-8', },
		});
		const json = await response.json();

		console.log(json);
	
		if (response.status === 200) {
			dispatch({
				type: UsersActionsTypes.REGISTER_SUCCESS,
				payload: {
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
			type: UsersActionsTypes.REGISTER_FAIL,
			payload: {
				request: {
					success: false,
					status: response.status,
					message: json.message,
					errors: json.errors ?? null,
				},
			},
		});
	};
};