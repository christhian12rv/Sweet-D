import types from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import config from '../../configs/config';

export function createOrder(products, toastId) {
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        products = products.map(p => {
            p.extras = p.extras.map(e => e.value);
            return p;
        });
        let response = await axios.post(config.serverUrl + "/api/orders", {
            products,
            token
        });

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        let data = response.data;

        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay });
                response = await axios.post(config.serverUrl + "/api/cart/clear");
                data = response.data;
                switch (data.status) {
                    case 200:
                        dispatch({ type: types.CART_CLEAR });
                        break;
                    case 500:
                        return {
                            type: "REDIRECT",
                            to: "/error/500"
                        };
                }
                return {
                    type: "REDIRECT_SUCCESS",
                    to: "/"
                };
            case 400:
                data.errors.forEach((error, i) => {
                    toastId.current = toast.error(error.msg, {
                        delay: delay,
                        autoClose: 5000 * (i + 1)
                    });
                });
                break;
            case 401:
                return {
                    type: "REDIRECT",
                    to: "/login"
                };
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function getOrders(limit, page, columnSort, directionSort, search) {
    return async dispatch => {
        const response = await axios.get(
            config.serverUrl + "/api/orders?limit=" +
                limit +
                "&page=" +
                page +
                "&columnSort=" +
                columnSort +
                "&directionSort=" +
                directionSort +
                "&search=" +
                search
        );

        const data = response.data;

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.ORDER_GET_ORDERS,
                    payload: {
                        orders: data.orders,
                        limit,
                        page,
                        totalRows: data.totalRows,
                        columnSort,
                        directionSort
                    }
                });
                break;
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function getOrdersByUser() {
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const response = await axios.post(config.serverUrl + "/api/orders/user", { token });

        const data = response.data;
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.ORDER_GET_ORDERS,
                    payload: {
                        orders: data.orders,
                        limit: -1,
                        page: 1,
                        totalRows: data.totalRows,
                        columnSort: "createdAt",
                        directionSort: "desc"
                    }
                });
                break;
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function getOrder(id) {
    return async dispatch => {
        const response = await axios.get(config.serverUrl + "/api/orders/" + id);

        const data = response.data;
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.ORDER_GET_ORDER,
                    payload: {
                        viewOrder: data.order
                    }
                });
                break;
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function updateFinish(id, toastId) {
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const response = await axios.put(config.serverUrl + "/api/orders", { id, token });

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, {
                    delay: delay
                });
                return {
                    success: true
                };
            case 400:
                data.errors.forEach((error, i) => {
                    toastId.current = toast.error(error.msg, {
                        delay: delay,
                        autoClose: 5000 * (i + 1)
                    });
                });
                break;
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function clearState() {
    return {
        type: types.CLEAR_STATE_ORDERS
    };
}

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_ORDERS,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
