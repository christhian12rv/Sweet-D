import { combineReducers } from 'redux';
import authReducer from './features/auth/auth.reducer';
import cartReducer from './features/cart/cart.reducer';
import productsReducer from './features/products/products.reducer';
import usersReducer from './features/users/users.reducer';

const reducers = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	users: usersReducer,
	auth: authReducer,
});

export default reducers;


export type RootState = ReturnType<typeof reducers>;