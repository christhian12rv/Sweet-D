import { Dispatch } from 'redux';
import { DashboardAction, DashboardActionsTypes } from './dashboard.types';

export const fetchDashboard = async (): Promise<[Response, any]> => {
	const response = await fetch('/api/dashboard', {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const json = await response.json();
	
	return [response, json];
};

export const clearRequest = (): (dispatch: Dispatch<DashboardAction>) => Promise<void> => {
	return async (dispatch: Dispatch<DashboardAction>): Promise<void> => {
		dispatch({ type: DashboardActionsTypes.CLEAR_REQUEST, });
	};
};