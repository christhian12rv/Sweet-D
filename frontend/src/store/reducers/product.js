import types from "../types";

const INITIAL_STATE = {
    product: {
        id: "",
        name: "",
        price: 0,
        description: "",
        extras: "",
        storage: "",
        photos: ""
    },
    products: []
};

export default function product(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.PRODUCT_GET_PRODUCT:
            return { ...state, ...action.payload };
        case types.PRODUCT_GET_PRODUCTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
