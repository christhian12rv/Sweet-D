import { DashboardAction, DashboardActionsTypes, DashboardState } from './dashboard.types';

const initialState: DashboardState = {
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

const dashboardReducer = (state = initialState, action: DashboardAction): DashboardState => {
	switch (action.type) {
	case DashboardActionsTypes.FETCH_DASHBOARD_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case DashboardActionsTypes.FETCH_DASHBOARD_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case DashboardActionsTypes.FETCH_DASHBOARD_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case DashboardActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default dashboardReducer;