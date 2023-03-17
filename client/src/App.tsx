import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import global from './styles/global';
import theme from './styles/theme';
import { MainLayout } from './pages/layout/MainLayout';
import { Home } from './pages/Home';

export const App: React.FunctionComponent<object> = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles styles={global} />
			<BrowserRouter >
				<Routes>
					<Route element={<MainLayout />} >
						<Route index element={<Home/>} />
					</Route>
				</Routes>
			</BrowserRouter >
		</ThemeProvider>
	);
};