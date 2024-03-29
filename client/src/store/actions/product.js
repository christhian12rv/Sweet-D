import types from "../constants";
import axios from "axios";
import config from '../../configs/config';

export function getProducts(
    limit,
    page,
    columnSort,
    directionSort,
    search,
    priceFilter,
    productNotFilterSlug
) {
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
                search +
                "&priceFilter=" +
                JSON.stringify(priceFilter) +
                "&productNotFilterSlug=" +
                productNotFilterSlug
        );

        const data = response.data;

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.PRODUCT_GET_PRODUCTS,
                    payload: {
                        products: data.products
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

export function getProductBySlug(slug) {
    return async dispatch => {
        const response = await axios.get(config.serverUrl + "/api/products/" + slug);

        const data = response.data;

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.PRODUCT_GET_PRODUCT,
                    payload: {
                        product: data.product
                    }
                });
                break;
            case 400:
                return {
                    type: "REDIRECT",
                    to: "/error/404"
                };
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function updateInputProduct(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_PRODUCT,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
