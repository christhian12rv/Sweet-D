import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './root.reducer';

const store = configureStore({
	reducer: rootReducer,
	middleware: [thunkMiddleware],
});

export default store;