import types from "../types";

const INITIAL_STATE = {
    products: [],
    limit: 10,
    page: 1,
    totalRows: 0,
    columnSort: "id",
    directionSort: "asc"
};

export default function listProducts(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LIST_PRODUCTS_GET_PRODUCTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
