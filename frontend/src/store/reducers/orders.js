import types from "../types";

const INITIAL_STATE = {
    orders: [],
    totalRows: 0
};

export default function orders(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ORDER_GET_ORDERS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
