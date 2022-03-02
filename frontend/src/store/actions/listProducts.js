import types from "../types";
import axios from "axios";

export function getProducts(limit, page, columnSort, directionSort, search) {
    return async dispatch => {
        const response = await axios.get(
            "/products?limit=" +
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
                    type: types.LIST_PRODUCTS_GET_PRODUCTS,
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

export function handleUpdateActive(active) {
    return async dispatch => {
        const response = await axios.get(
            "/products?limit=" +
                limit +
                "&page=" +
                page +
                "&columnSort=" +
                columnSort +
                "&directionSort=" +
                directionSort
        );

        const data = response.data;

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.LIST_PRODUCTS_GET_PRODUCTS,
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

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_LIST_PRODUCTS,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
