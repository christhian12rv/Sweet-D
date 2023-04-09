import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import PaginationModelType from '../../../types/PaginationModelType';
import ProductCreateType from '../../../types/Product/Create/ProductCreateType';
import ProductChoicesType from '../../../types/Product/ProductChoicesType';
import ProductUpdateType from '../../../types/Product/Update/ProductUpdateType';
import { ProductsAction, ProductsActionsTypes } from './products.types';

export const findBySlug = async (slug: string): Promise<[Response, any]> => {
	const response = await fetch(`/api/products/find-by-slug/${slug}`, {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const json = await response.json();
	
	return [response, json];
};

export const findAllProducts = async (paginationModel: PaginationModelType): Promise<[Response, any]> => {
	let urlQueries = `?limit=${paginationModel.pageSize}&page=${paginationModel.page + 1}`;

	if (paginationModel.sort)
		urlQueries += `&columnSort=${paginationModel.sort.field}&directionSort=${paginationModel.sort.sort}`;

	const response = await fetch(`/api/products${urlQueries}`, {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const json = await response.json();
	
	return [response, json];
};

export const findAllByIds = async (ids: number[]): Promise<[Response, any]> => {
	const response = await fetch(`/api/products/find-all-by-ids?ids=${ids ? ids.join(',') : []}`, {
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

		const formData = setProductCreateToFormData(product);
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

export const updateProduct = (product: ProductUpdateType): (dispatch: Dispatch<ProductsAction>) => Promise<void> => {
	return async (dispatch: Dispatch<ProductsAction>): Promise<void> => {
		console.log(product);
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);
		if (!token)
			return;
		
		dispatch({ type: ProductsActionsTypes.UPDATE_PENDING, });

		const formData = setProductUpdateToFormData(product);
		formData.append('token', token);

		const response = await fetch('/api/products', {
			method: 'PUT',
			body: formData,
		});
		const json = await response.json();

		if (response.status === 200) {
			dispatch({
				type: ProductsActionsTypes.UPDATE_SUCCESS,
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
			type: ProductsActionsTypes.UPDATE_FAIL,
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

const setProductCreateToFormData = (product: ProductCreateType): FormData => {
	const formData = setProductToFormData(product);

	return formData;
};

const setProductUpdateToFormData = (product: ProductUpdateType): FormData => {
	const formData = setProductToFormData(product);
	formData.append('id', product.id.toString());
	formData.append('active', product.active.toString());

	return formData;
};

const setProductToFormData = (product: ProductCreateType | ProductUpdateType): FormData => {
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