import types from "../constants";

const INITIAL_STATE = {
    products: [],
    total: 0,
    productsData: [],
    sessionTotalProducts: 0
};

export default function cart(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.CART_ADD_PRODUCT:
            return {
                ...state,
                ...action.payload
            };
        case types.CART_CLEAR:
            return {
                ...INITIAL_STATE
            };
        default:
            return state;
    }
}
