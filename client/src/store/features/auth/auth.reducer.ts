import { AuthAction, AuthActionsTypes, AuthState } from './auth.types';

const initialState: AuthState = {
	user: null,
	token: null,
	request: {
		success: true,
		status: 200,
		message: '',
		errors: null,
	},
	loading: false,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
	case AuthActionsTypes.LOGIN_PENDING: {
		return { ...state, ...action.payload, loading: true, };
	}
	case AuthActionsTypes.LOGIN_SUCCESS: {
		return { ...state, ...action.payload, loading: false, };
	}
	case AuthActionsTypes.LOGIN_FAIL: {
		return { ...state, ...action.payload, loading: false, };
	}
	default:
		return state;
	}
};

export default authReducer;