import { OrdersAction, OrdersActionsTypes, OrdersState } from './orders.types';

const initialState: OrdersState = {
	request: {
		success: true,
		status: 200,
		message: '',
		errors: null,
	},
	loading: false,
	previousType: null,
};

const ordersReducer = (state = initialState, action: OrdersAction): OrdersState => {
	switch (action.type) {
	case OrdersActionsTypes.FIND_ALL_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case OrdersActionsTypes.FIND_ALL_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case OrdersActionsTypes.FIND_ALL_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case OrdersActionsTypes.CREATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case OrdersActionsTypes.CREATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case OrdersActionsTypes.CREATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case OrdersActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default ordersReducer;