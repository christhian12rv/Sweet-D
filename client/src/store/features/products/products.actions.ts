import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import ProductCreateType from '../../../types/Product/Create/ProductCreateType';
import { ProductsAction, ProductsActionsTypes } from './products.types';

export const findAllProducts = async (): Promise<[Response, any]> => {
	const response = await fetch('/api/products?limit=10&page=1', {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const json = await response.json();
	
	return [response, json];
};

export const createProduct = (product: ProductCreateType): (dispatch: Dispatch<ProductsAction>) => Promise<void> => {
	return async (dispatch: Dispatch<ProductsAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);
		if (!token)
			return;
		
		dispatch({ type: ProductsActionsTypes.CREATE_PENDING, });

		const formData = setProductToFormData(product);
		formData.append('token', token);

		const response = await fetch('/api/products', {
			method: 'POST',
			body: formData,
		});
		const json = await response.json();

		if (response.status === 200) {
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

export const clearRequest = (): (dispatch: Dispatch<ProductsAction>) => Promise<void> => {
	return async (dispatch: Dispatch<ProductsAction>): Promise<void> => {
		dispatch({ type: ProductsActionsTypes.CLEAR_REQUEST, });
	};
};

const setProductToFormData = (product: ProductCreateType): FormData => {
	const formData = new FormData();

	formData.append('name', product.name);
	formData.append('description', product.description);
	product.photos.forEach(photo => {
		formData.append('photos', photo);
	});
	formData.append('slug', product.slug);
	formData.append('sizes', JSON.stringify(product.sizes));
	formData.append('ingredients', JSON.stringify(product.ingredients));
	formData.append('ingredientTypes', JSON.stringify(product.ingredientTypes));
	return formData;
};