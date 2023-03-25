import { Dispatch } from 'redux';
import { ProductsAction, ProductsActionsTypes } from './products.types';

export const findAllProducts = (): (dispatch: Dispatch<ProductsAction>) => Promise<void> => {
	return async (dispatch: Dispatch<ProductsAction>): Promise<void> => {
		dispatch({ type: ProductsActionsTypes.FIND_ALL_PENDING, });

		const response = await fetch('/api/products?limit=10&page=1');
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: ProductsActionsTypes.FIND_ALL_SUCCESS,
				payload: {
					products: json.products,
				},
			});
			return;
		}

		dispatch({
			type: ProductsActionsTypes.FIND_ALL_ERROR,
			payload: {
				error: {
					message: json.message,
					status: response.status,
					array: json.errors ?? [],
				},
			},
		});
	};
};