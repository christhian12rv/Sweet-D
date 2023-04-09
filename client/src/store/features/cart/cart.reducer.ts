import { CartAction, CartActionsTypes, CartState } from './cart.types';

const initialState: CartState = {
	productsChoices: [],
	request: {
		success: true,
		status: 200,
		message: '',
		errors: null,
	},
	loading: false,
	previousType: null,
};

const cartReducer = (state = initialState, action: CartAction): CartState => {
	switch (action.type) {
	case CartActionsTypes.FETCH_CART_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case CartActionsTypes.FETCH_CART_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case CartActionsTypes.FETCH_CART_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case CartActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default cartReducer;