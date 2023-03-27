import { AuthAction, AuthActionsTypes, AuthState } from './auth.types';

const initialState: AuthState = {
	user: null,
	logout: false,
	request: null,
	loading: false,
	previousType: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
	case AuthActionsTypes.LOGIN_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case AuthActionsTypes.LOGIN_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case AuthActionsTypes.LOGIN_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	
	case AuthActionsTypes.GET_USER_AUTH_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case AuthActionsTypes.GET_USER_AUTH_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case AuthActionsTypes.GET_USER_AUTH_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case AuthActionsTypes.LOGOUT_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case AuthActionsTypes.LOGOUT_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case AuthActionsTypes.LOGOUT_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case AuthActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default authReducer;