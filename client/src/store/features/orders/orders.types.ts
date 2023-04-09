import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum OrdersActionsTypes {
	FIND_ALL_PENDING = 'ORDERS_FIND_ALL_PENDING',
	FIND_ALL_SUCCESS = 'ORDERS_FIND_ALL_SUCCESS',
	FIND_ALL_FAIL = 'ORDERS_FIND_ALL_FAIL',

	CREATE_PENDING = 'ORDERS_CREATE_PENDING',
	CREATE_SUCCESS = 'ORDERS_CREATE_SUCCESS',
	CREATE_FAIL = 'ORDERS_CREATE_FAIL',

	CLEAR_REQUEST = 'ORDERS_CLEAR_REQUEST',
}

export type OrdersAction = {
	payload?: {
		request: RequestType;
	}
} & GlobalActionType;

export type OrdersState = GlobalStateType;