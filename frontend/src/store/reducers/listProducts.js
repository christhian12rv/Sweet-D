import types from "../types";

const INITIAL_STATE = {
    products: [],
    limit: 10,
    page: 1,
    totalRows: 0,
    columnSort: "id",
    directionSort: "asc",
    input: {
        search: ""
    }
};

export default function listProducts(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LIST_PRODUCTS_GET_PRODUCTS:
            return { ...state, ...action.payload };
        case types.UPDATE_INPUT_LIST_PRODUCTS:
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };
        default:
            return state;
    }
}
