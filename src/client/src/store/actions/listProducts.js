import types from "../constants";
import axios from "axios";

export function getProducts(
    limit,
    page,
    columnSort,
    directionSort,
    search,
    priceFilter
) {
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
                search +
                "&priceFilter=" +
                JSON.stringify(priceFilter)
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
                        directionSort,
                        minPrice: data.minPrice,
                        maxPrice: data.maxPrice
                    }
                });
                return {
                    minPrice: data.minPrice,
                    maxPrice: data.maxPrice
                };
                break;
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function updateSelectFilter(value) {
    let columnSort = "id";
    let directionSort = "asc";
    switch (value) {
        case "min-price":
            columnSort = "price";
            break;
        case "max-price":
            columnSort = "price";
            directionSort = "desc";
            break;
        case "available":
            columnSort = "active";
            directionSort = "desc";
            break;
        case "with-storage":
            columnSort = "storage";
            directionSort = "desc";
            break;
    }
    return {
        type: types.UPDATE_SELECT_FILTER_LIST_PRODUCTS,
        payload: {
            columnSort,
            directionSort
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
