import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';

export const NeedsAuth: React.FunctionComponent = () => {
	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

	if (!token)
		return <Navigate to="/" replace />;
		

	return <Outlet/>;
};