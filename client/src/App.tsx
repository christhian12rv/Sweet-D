import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
					</Route>
				</Routes>
			</BrowserRouter >
		</ThemeProvider>
	);
};