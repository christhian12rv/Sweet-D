import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum ProductsActionsTypes {
	FIND_ALL_PENDING = 'PRODUCTS_FIND_ALL_PENDING',
	FIND_ALL_SUCCESS = 'PRODUCTS_FIND_ALL_SUCCESS',
	FIND_ALL_FAIL = 'PRODUCTS_FIND_ALL_FAIL',

	CREATE_PENDING = 'PRODUCTS_CREATE_PENDING',
	CREATE_SUCCESS = 'PRODUCTS_CREATE_SUCCESS',
	CREATE_FAIL = 'PRODUCTS_CREATE_FAIL',

	UPDATE_PENDING = 'PRODUCTS_UPDATE_PENDING',
	UPDATE_SUCCESS = 'PRODUCTS_UPDATE_SUCCESS',
	UPDATE_FAIL = 'PRODUCTS_UPDATE_FAIL',

	CLEAR_REQUEST = 'PRODUCTS_CLEAR_REQUEST',
}

export type ProductsAction = {
	payload?: {
		request: RequestType;
	}
} & GlobalActionType;

export type ProductsState = GlobalStateType;