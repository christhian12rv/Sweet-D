import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import ProductChoicesType from '../../../types/Product/ProductChoicesType';
import { CartAction, CartActionsTypes } from './cart.types';

export const fetchCart = (): (dispatch: Dispatch<CartAction>) => Promise<void> => {
	return async (dispatch: Dispatch<CartAction>): Promise<void> => {	
		dispatch({ type: CartActionsTypes.FETCH_CART_PENDING, });

		const cart = localStorage.getItem(LocalStorageEnum.CART);

		dispatch({
			type: CartActionsTypes.FETCH_CART_SUCCESS,
			payload: {
				productsChoices: cart ? JSON.parse(cart) : [],
			},
		});
	};
};

export const addToCart = (cartChoices: ProductChoicesType): void => {
	const cart = localStorage.getItem(LocalStorageEnum.CART);
	let cartObject = JSON.parse(cart || '[]') as ProductChoicesType[];

	let isOnCart = false;

	if (cart) {
		cartObject = cartObject.map(c => {
			if (c.id === cartChoices.id) {
				isOnCart = true;
				return cartChoices;
			}

			return c;
		});
	}

	if (!isOnCart)
		cartObject.push(cartChoices);

	localStorage.setItem(LocalStorageEnum.CART, JSON.stringify(cartObject));
};

export const removeOfCart = (id: number): void => {
	const cart = localStorage.getItem(LocalStorageEnum.CART);
	let cartObject = JSON.parse(cart || '[]') as ProductChoicesType[];

	cartObject = cartObject.filter(p => p.id !== id);

	localStorage.setItem(LocalStorageEnum.CART, JSON.stringify(cartObject));
};

export const clearCart = (): void => {
	localStorage.removeItem(LocalStorageEnum.CART);
};

export const clearRequest = (): (dispatch: Dispatch<CartAction>) => Promise<void> => {
	return async (dispatch: Dispatch<CartAction>): Promise<void> => {
		dispatch({ type: CartActionsTypes.CLEAR_REQUEST, });
	};
};