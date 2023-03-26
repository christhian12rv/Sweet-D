import { ProductsAction, ProductsActionsTypes, ProductsState } from './products.types';

const initialState: ProductsState = {
	products: null,
	product: null,
	request: {
		success: true,
		status: 200,
		message: '',
		errors: null,
	},
	loading: false,
};

const productsReducer = (state = initialState, action: ProductsAction): ProductsState => {
	switch (action.type) {
	case ProductsActionsTypes.FIND_ALL_PENDING: {
		return { ...state, ...action.payload, loading: true, };
	}
	case ProductsActionsTypes.FIND_ALL_SUCCESS: {
		return { ...state, ...action.payload, loading: false, };
	}
	case ProductsActionsTypes.FIND_ALL_FAIL: {
		return { ...state, ...action.payload, loading: false, };
	}
	default:
		return state;
	}
};

export default productsReducer;