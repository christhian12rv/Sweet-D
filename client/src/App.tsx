import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import global from './styles/global';
import theme from './styles/theme';
import { MainLayout } from './pages/layout/MainLayout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import RoutesEnum from './types/enums/RoutesEnum';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { Error404 } from './pages/Error404';
import { Error500 } from './pages/Error500';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { ProfileLayout } from './pages/layout/ProfileLayout';

export const App: React.FunctionComponent<object> = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles styles={global} />
			<BrowserRouter >
				<ScrollToTop />
				<Routes>
					<Route element={<MainLayout />} >
						<Route index element={<Home/>} />
						<Route path={RoutesEnum.PRODUCTS} element={<Products/>} />
						<Route path={`${RoutesEnum.PRODUCT}:slug`} element={<Product/>} />
						<Route path={RoutesEnum.CART} element={<Cart/>} />
						<Route path={RoutesEnum.LOGIN} element={<Login/>} />
						<Route path={RoutesEnum.REGISTER} element={<Register/>} />
						<Route path={RoutesEnum.CONTACT} element={<Contact/>} />
						<Route element={<ProfileLayout/>} >
							<Route path={RoutesEnum.PROFILE} element={<Profile/>} />
							<Route path={RoutesEnum.ORDERS} element={<Orders/>} />
						</Route>
						<Route path={RoutesEnum.ERROR_500} element={<Error500 />} />
						<Route path="*" element={<Error404 />} />
					</Route>
				</Routes>
			</BrowserRouter >
		</ThemeProvider>
	);
};