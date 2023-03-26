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
					request: {
						success: true,
						status: response.status,
						message: json.message,
						errors: null,
					},
				},
			});
			return;
		}

		dispatch({
			type: ProductsActionsTypes.FIND_ALL_FAIL,
			payload: {
				request: {
					success: true,
					status: response.status,
					message: json.message,
					errors: json.errors ?? null,
				},
			},
		});
	};
};

export const createProduct = (product): (dispatch: Dispatch<ProductsAction>) => Promise<void> => {
	return async (dispatch: Dispatch<ProductsAction>): Promise<void> => {
		dispatch({ type: ProductsActionsTypes.CREATE_FAIL, });

		const response = await fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify(product),
		});
		const json = await response.json();

		if (response.status === 201) {
			dispatch({
				type: ProductsActionsTypes.CREATE_SUCCESS,
				payload: {
					product: json.product,
					request: {
						success: true,
						status: response.status,
						message: json.message,
						errors: null,
					},
				},
			});
			return;
		}

		dispatch({
			type: ProductsActionsTypes.CREATE_FAIL,
			payload: {
				request: {
					success: true,
					status: response.status,
					message: json.message,
					errors: json.errors ?? null,
				},
			},
		});
	};
};