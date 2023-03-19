import { Box, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const MainLayout: React.FunctionComponent<object> = () => {
	return (
		<>
			<Navbar/>
			<Box component="main" sx={{ py: 3, }}>
				<Toolbar/>
				<Outlet/>
			</Box>
			<Footer/>
		</>
	);
};