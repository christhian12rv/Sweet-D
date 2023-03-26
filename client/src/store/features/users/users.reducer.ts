import { UsersAction, UsersActionsTypes, UsersState } from './users.types';

const initialState: UsersState = {
	user: null,
	users: null,
	request: {
		success: true,
		status: 200,
		message: '',
		errors: null,
	},
	loading: false,
};

const usersReducer = (state = initialState, action: UsersAction): UsersState => {
	switch (action.type) {
	case UsersActionsTypes.REGISTER_PENDING: {
		return { ...state, ...action.payload, loading: true, };
	}
	case UsersActionsTypes.REGISTER_SUCCESS: {
		return { ...state, ...action.payload, loading: false, };
	}
	case UsersActionsTypes.REGISTER_FAIL: {
		return { ...state, ...action.payload, loading: false, };
	}
	default:
		return state;
	}
};

export default usersReducer;