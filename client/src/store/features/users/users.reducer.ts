import { UsersAction, UsersActionsTypes, UsersState } from './users.types';

const initialState: UsersState = {
	request: null,
	loading: false,
	previousType: null,
};

const usersReducer = (state = initialState, action: UsersAction): UsersState => {
	switch (action.type) {
	case UsersActionsTypes.REGISTER_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case UsersActionsTypes.REGISTER_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case UsersActionsTypes.REGISTER_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case UsersActionsTypes.UPDATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case UsersActionsTypes.UPDATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case UsersActionsTypes.UPDATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case UsersActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default usersReducer;