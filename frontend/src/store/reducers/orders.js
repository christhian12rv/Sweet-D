import types from "../types";

const INITIAL_STATE = {
    orders: [],
    limit: 10,
    page: 1,
    totalRows: 0,
    columnSort: "id",
    directionSort: "asc",
    input: {
        search: ""
    },
    viewOrder: null
};

export default function orders(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ORDER_GET_ORDERS:
            return {
                ...state,
                ...action.payload
            };
        case types.ORDER_GET_ORDER:
            return {
                ...state,
                viewOrder: action.payload.viewOrder
            };
        case types.UPDATE_INPUT_ORDERS:
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
