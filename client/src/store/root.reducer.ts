import { combineReducers } from 'redux';
import productsReducer from './features/products/products.reducer';

const reducers = combineReducers({
	products: productsReducer,
});

export default reducers;


export type RootState = ReturnType<typeof reducers>;