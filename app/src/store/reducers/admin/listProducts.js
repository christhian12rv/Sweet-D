import types from "../../constants";

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

export default function listProductsAdmin(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ADMIN_LIST_PRODUCTS_GET_PRODUCTS:
            return { ...state, ...action.payload };
        case types.UPDATE_INPUT_ADMIN_LIST_PRODUCTS:
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
