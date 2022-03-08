import types from "../../constants";

const INITIAL_STATE = {
    id: null,
    input: {
        name: "",
        slug: "",
        price: "",
        storage: "",
        description: "",
        extras: [],
        priceExtras: [],
        photos: []
    }
};

export default function editProductAdmin(state = INITIAL_STATE, action) {
    console.log(action.payload);
    switch (action.type) {
        case types.UPDATE_INPUT_ADMIN_EDIT_PRODUCT:
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };
        case types.ADMIN_EDIT_PRODUCT_GET_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                input: {
                    ...state.input,
                    ...action.payload.input
                }
            };
        case types.CLEAR_STATE_ADMIN_EDIT_PRODUCT:
            return { ...INITIAL_STATE };
        case types.UPDATE_INPUT_ADMIN_EDIT_PRODUCT_PRICE_EXTRAS: {
            return {
                ...state,
                input: { ...state.input, ...action.payload.input }
            };
        }
        default:
            return state;
    }
}
