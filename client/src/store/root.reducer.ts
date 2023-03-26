import { combineReducers } from 'redux';
import authReducer from './features/auth/auth.reducer';
import productsReducer from './features/products/products.reducer';
import usersReducer from './features/users/users.reducer';

const reducers = combineReducers({
	products: productsReducer,
	users: usersReducer,
	auth: authReducer,
});

export default reducers;


export type RootState = ReturnType<typeof reducers>;