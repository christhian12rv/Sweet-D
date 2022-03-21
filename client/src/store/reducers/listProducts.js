import types from "../constants";

const INITIAL_STATE = {
    products: [],
    limit: 2,
    page: 1,
    totalRows: 0,
    columnSort: "id",
    directionSort: "asc",
    minPrice: null,
    maxPrice: null,
    input: {
        search: "",
        price: [0, 0]
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
        case types.UPDATE_SELECT_FILTER_LIST_PRODUCTS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
