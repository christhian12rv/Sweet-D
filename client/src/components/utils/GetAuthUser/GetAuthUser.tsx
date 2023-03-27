import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getUserAuth as getUserAuthAction } from '../../../store/features/auth/auth.actions';

export const GetAuthUser: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	
	useEffect(() => {
		dispatch(getUserAuthAction());
	}, []);

	return <></>;
};