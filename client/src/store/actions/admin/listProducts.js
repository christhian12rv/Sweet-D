import types from "../../constants";
import axios from "axios";
import { toast } from "react-toastify";
import config from '../../../configs/config';

export function getProducts(limit, page, columnSort, directionSort, search) {
    return async dispatch => {
        const response = await axios.get(
            config.serverUrl + "/api/products?limit=" +
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
                    type: types.ADMIN_LIST_PRODUCTS_GET_PRODUCTS,
                    payload: {
                        products: data.products,
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

export function updateActive(id, active, toastId) {
    return async () => {
        const token = localStorage.getItem("user_token");
        const response = await axios.put(config.serverUrl + "/api/products/active", {
            id,
            active,
            token
        });

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
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

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_ADMIN_LIST_PRODUCTS,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
