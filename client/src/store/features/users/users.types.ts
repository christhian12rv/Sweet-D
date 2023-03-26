import UserType from '../../../types/User/UserType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum UsersActionsTypes {
	REGISTER_PENDING = 'USERS_REGISTER_PENDING',
	REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS',
	REGISTER_FAIL = 'USERS_REGISTER_FAIL'
}

export type UsersAction = {
	payload?: {
		users?: UserType[] | null;
		user?: UserType | null;
		request: RequestType;
	}
} & GlobalActionType;

export type UsersState = {
	users: UserType[] | null;
	user: UserType | null;
} & GlobalStateType;