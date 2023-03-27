import UserType from '../../../types/User/UserType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum AuthActionsTypes {
	LOGIN_PENDING = 'AUTH_LOGIN_PENDING',
	LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
	LOGIN_FAIL = 'AUTH_LOGIN_FAIL',

	GET_USER_AUTH_PENDING = 'AUTH_GET_USER_AUTH_PENDING',
	GET_USER_AUTH_SUCCESS = 'AUTH_GET_USER_AUTH_SUCCESS',
	GET_USER_AUTH_FAIL = 'AUTH_GET_USER_AUTH_FAIL',

	LOGOUT_PENDING = 'AUTH_LOGOUT_PENDING',
	LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS',
	LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL',

	CLEAR_REQUEST = 'AUTH_CLEAR_REQUEST',
}

export type AuthAction = {
	payload?: {
		user?: UserType | null;
		logout?: boolean;
		request: RequestType;
	}
} & GlobalActionType;

export type AuthState = {
	user: UserType | null;
	logout: boolean;
} & GlobalStateType;