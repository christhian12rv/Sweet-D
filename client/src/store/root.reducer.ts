import { combineReducers } from 'redux';
import authReducer from './features/auth/auth.reducer';
import cartReducer from './features/cart/cart.reducer';
import ordersReducer from './features/orders/orders.reducer';
import productsReducer from './features/products/products.reducer';
import usersReducer from './features/users/users.reducer';

const reducers = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
	users: usersReducer,
	auth: authReducer,
});

export default reducers;


export type RootState = ReturnType<typeof reducers>;