import dayjs from 'dayjs';
import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import PaginationModelType from '../../../types/PaginationModelType';
import { RootState } from '../../root.reducer';
import { OrdersAction, OrdersActionsTypes } from './orders.types';

export const findAllOrders = async (paginationModel: PaginationModelType): Promise<[Response, any]> => {
	let urlQueries = `?limit=${paginationModel.pageSize}&page=${paginationModel.page + 1}`;

	if (paginationModel.sort)
		urlQueries += `&columnSort=${paginationModel.sort.field}&directionSort=${paginationModel.sort.sort}`;

	const response = await fetch(`/api/orders${urlQueries}`, {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const json = await response.json();
	
	return [response, json];
};

export const findOrdersByLoggedUser = async (paginationModel: PaginationModelType): Promise<[Response, any] | void> => {
	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);
	if (!token)
		return;

	let urlQueries = `?limit=${paginationModel.pageSize}&page=${paginationModel.page + 1}`;

	if (paginationModel.sort)
		urlQueries += `&columnSort=${paginationModel.sort.field}&directionSort=${paginationModel.sort.sort}`;

	const response = await fetch(`/api/orders/user${urlQueries}`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({ token, }),
	});
	const json = await response.json();
		
	return [response, json];
};

export const findById = async (id: number): Promise<[Response, any] | void> => {
	const response = await fetch(`/api/orders/${id}`, {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const json = await response.json();
		
	return [response, json];
};

export const createOrder = (dateTime: dayjs.Dayjs): (dispatch: Dispatch<OrdersAction>, getState: () => RootState) => Promise<void> => {
	return async (dispatch: Dispatch<OrdersAction>, getState: () => RootState): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);
		if (!token)
			return;

		const { productsChoices, } = getState().cart;

		dispatch({ type: OrdersActionsTypes.CREATE_PENDING, });


		const response = await fetch('/api/orders', {
			method: 'POST',
			body: JSON.stringify({
				productsChoices: productsChoices,
				date: dateTime.toDate(),
				token,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		const json = await response.json();

		if (response.status === 200) {
			dispatch({
				type: OrdersActionsTypes.CREATE_SUCCESS,
				payload: {
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
			type: OrdersActionsTypes.CREATE_FAIL,
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

export const clearRequest = (): (dispatch: Dispatch<OrdersAction>) => Promise<void> => {
	return async (dispatch: Dispatch<OrdersAction>): Promise<void> => {
		dispatch({ type: OrdersActionsTypes.CLEAR_REQUEST, });
	};
};