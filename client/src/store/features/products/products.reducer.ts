import { ProductsAction, ProductsActionsTypes, ProductsState } from './products.types';

const initialState: ProductsState = {
	request: {
		success: true,
		status: 200,
		message: '',
		errors: null,
	},
	loading: false,
	previousType: null,
};

const productsReducer = (state = initialState, action: ProductsAction): ProductsState => {
	switch (action.type) {
	case ProductsActionsTypes.FIND_ALL_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case ProductsActionsTypes.FIND_ALL_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case ProductsActionsTypes.FIND_ALL_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case ProductsActionsTypes.CREATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case ProductsActionsTypes.CREATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case ProductsActionsTypes.CREATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case ProductsActionsTypes.UPDATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case ProductsActionsTypes.UPDATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case ProductsActionsTypes.UPDATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case ProductsActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default productsReducer;