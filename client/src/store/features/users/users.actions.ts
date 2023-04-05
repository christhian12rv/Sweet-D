import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import UserRegisterType from '../../../types/User/Register/UserRegisterType';
import UserUpdateType from '../../../types/User/Update/UserUpdateType';
import { UsersAction, UsersActionsTypes } from './users.types';

export const register = (user: UserRegisterType): (dispatch: Dispatch<UsersAction>) => Promise<void> => {
	return async (dispatch: Dispatch<UsersAction>): Promise<void> => {
		dispatch({ type: UsersActionsTypes.REGISTER_PENDING, });

		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		const json = await response.json();
	
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

export const update = (user: UserUpdateType): (dispatch: Dispatch<UsersAction>) => Promise<void> => {
	return async (dispatch: Dispatch<UsersAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);
		if (!token)
			return;
			
		dispatch({ type: UsersActionsTypes.UPDATE_PENDING, });

		const response = await fetch('/api/users', {
			method: 'PUT',
			body: JSON.stringify({ token, ...user, }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: UsersActionsTypes.UPDATE_SUCCESS,
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
			type: UsersActionsTypes.UPDATE_FAIL,
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

export const clearRequest = (): (dispatch: Dispatch<UsersAction>) => Promise<void> => {
	return async (dispatch: Dispatch<UsersAction>): Promise<void> => {
		dispatch({ type: UsersActionsTypes.CLEAR_REQUEST, });
	};
};