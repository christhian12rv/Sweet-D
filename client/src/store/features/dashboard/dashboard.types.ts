import ProductChoicesType from '../../../types/Product/ProductChoicesType';
import { GlobalActionType, GlobalStateType } from '../../types/global.store.types';

export enum DashboardActionsTypes {
	FETCH_DASHBOARD_PENDING = 'DASHBOARD_FETCH_DASHBOARD_PENDING',
	FETCH_DASHBOARD_SUCCESS = 'DASHBOARD_FETCH_DASHBOARD_SUCCESS',
	FETCH_DASHBOARD_FAIL = 'DASHBOARD_FETCH_DASHBOARD_FAIL',

	CLEAR_REQUEST = 'DASHBOARD_CLEAR_REQUEST',
}

export type DashboardAction = {
	payload?: {
		productsChoices: ProductChoicesType[];
	}
} & GlobalActionType;

export type DashboardState = {
	productsChoices: ProductChoicesType[];
} & GlobalStateType;