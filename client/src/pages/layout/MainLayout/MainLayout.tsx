import { Box, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../../components/Navbar';

export const MainLayout: React.FunctionComponent<object> = () => {
	return (
		<>
			<Navbar/>
			<Box component="main" sx={{ py: 3, }}>
				<Toolbar/>
				<Outlet/>
			</Box>
		</>
	);
};