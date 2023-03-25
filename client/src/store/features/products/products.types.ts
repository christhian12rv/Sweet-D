import ProductType from '../../../types/Product/ProductType';
import { GlobalActionType, GlobalErrorType, GlobalStateType } from '../../types/global.store.types';

export enum ProductsActionsTypes {
	FIND_ALL_PENDING = 'PRODUCTS_FIND_ALL_PENDING',
	FIND_ALL_SUCCESS = 'PRODUCTS_FIND_ALL_SUCCESS',
	FIND_ALL_ERROR = 'PRODUCTS_FIND_ALL_ERROR',
}

export type ProductsAction = {
	payload?: {
		products?: ProductType[],
		error?: GlobalErrorType;
	}
} & GlobalActionType;

export type ProductsState = {
	products: ProductType[];
} & GlobalStateType;