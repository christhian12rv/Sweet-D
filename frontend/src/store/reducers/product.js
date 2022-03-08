import types from "../constants";

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
    products: [],
    input: {
        extras: [],
        quantity: 1
    }
};

export default function product(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.PRODUCT_GET_PRODUCT:
            return { ...state, ...action.payload };
        case types.PRODUCT_GET_PRODUCTS:
            return { ...state, ...action.payload };
        case types.UPDATE_INPUT_PRODUCT:
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
