import UserType from '../../../types/User/UserType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum AuthActionsTypes {
	LOGIN_PENDING = 'AUTH_LOGIN_PENDING',
	LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
	LOGIN_FAIL = 'AUTH_LOGIN_FAIL',
}

export type AuthAction = {
	payload?: {
		user?: UserType | null;
		token?: string | null;
		request: RequestType;
	}
} & GlobalActionType;

export type AuthState = {
	user: UserType | null;
	token: string | null;
} & GlobalStateType;