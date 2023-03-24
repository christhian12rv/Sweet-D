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
import { Order } from './pages/Order';
import { ForgotPassword } from './pages/ForgotPassword';
import { MainLayout as AdminMainLayout } from './pages/Admin/layout/MainLayout';
import { Products as AdminProducts } from './pages/Admin/Products';
import { AddProduct as AdminAddProduct } from './pages/Admin/AddProduct';

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
						<Route path={RoutesEnum.FORGOT_PASSWORD} element={<ForgotPassword/>} />
						<Route path={RoutesEnum.CONTACT} element={<Contact/>} />
						<Route element={<ProfileLayout/>} >
							<Route path={RoutesEnum.PROFILE} element={<Profile/>} />
							<Route path={RoutesEnum.ORDERS} element={<Orders/>} />
							<Route path={`${RoutesEnum.ORDER}:id`} element={<Order/>} />
						</Route>
						<Route path={RoutesEnum.ERROR_500} element={<Error500 />} />
						<Route path="*" element={<Error404 />} />
					</Route>

					<Route element={<AdminMainLayout />} >
						<Route path={RoutesEnum.ADMIN_PRODUCTS} element={<AdminProducts/>} />
						<Route path={RoutesEnum.ADMIN_ADD_PRODUCT} element={<AdminAddProduct/>} />
					</Route>
				</Routes>
			</BrowserRouter >
		</ThemeProvider>
	);
};