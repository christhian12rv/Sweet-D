import ProductChoicesType from '../../../types/Product/ProductChoicesType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum CartActionsTypes {
	FETCH_CART_PENDING = 'CART_FETCH_CART_PENDING',
	FETCH_CART_SUCCESS = 'CART_FETCH_CART_SUCCESS',
	FETCH_CART_FAIL = 'CART_FETCH_CART_FAIL',

	CLEAR_REQUEST = 'CART_CLEAR_REQUEST',
}

export type CartAction = {
	payload?: {
		productsChoices: ProductChoicesType[];
	}
} & GlobalActionType;

export type CartState = {
	productsChoices: ProductChoicesType[];
} & GlobalStateType;