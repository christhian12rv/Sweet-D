import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import RoutesEnum from '../../../types/enums/RoutesEnum';

export const VerifyAdminAuth: React.FunctionComponent = () => {
	const { user, loading, } = useTypedSelector((state) => state.auth);

	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

	if (!token)
		return <Navigate to="/" replace />;

	console.log(user);

	return loading || !user ? <></> : 
		user.isAdmin ?
			<Outlet/> :
			<Navigate to={RoutesEnum.ERROR_404} replace />;
};