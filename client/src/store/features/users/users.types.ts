import UserType from '../../../types/User/UserType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum UsersActionsTypes {
	REGISTER_PENDING = 'USERS_REGISTER_PENDING',
	REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS',
	REGISTER_FAIL = 'USERS_REGISTER_FAIL',

	UPDATE_PENDING = 'USERS_UPDATE_PENDING',
	UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS',
	UPDATE_FAIL = 'USERS_UPDATE_FAIL',

	CLEAR_REQUEST = 'USERS_CLEAR_REQUEST',
}

export type UsersAction = {
	payload?: {
		users?: UserType[] | null;
		user?: UserType | null;
		request: RequestType;
	}
} & GlobalActionType;

export type UsersState = {
	// users: UserType[] | null;
	// user: UserType | null;
} & GlobalStateType;