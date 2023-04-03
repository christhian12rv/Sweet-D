import ProductType from '../../../types/Product/ProductType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum ProductsActionsTypes {
	FIND_ALL_PENDING = 'PRODUCTS_FIND_ALL_PENDING',
	FIND_ALL_SUCCESS = 'PRODUCTS_FIND_ALL_SUCCESS',
	FIND_ALL_FAIL = 'PRODUCTS_FIND_ALL_FAIL',

	CREATE_PENDING = 'PRODUCTS_CREATE_PENDING',
	CREATE_SUCCESS = 'PRODUCTS_CREATE_SUCCESS',
	CREATE_FAIL = 'PRODUCTS_CREATE_FAIL',

	CLEAR_REQUEST = 'PRODUCTS_CLEAR_REQUEST',
}

export type ProductsAction = {
	payload?: {
		products?: ProductType[] | null,
		product?: ProductType | null,
		request: RequestType;
	}
} & GlobalActionType;

export type ProductsState = {
	// products: ProductType[] | null;
	// product: ProductType | null;
} & GlobalStateType;