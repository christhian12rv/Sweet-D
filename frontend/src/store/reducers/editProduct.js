import types from "../types";

const INITIAL_STATE = {
    id: null,
    input: {
        name: "",
        slug: "",
        price: "",
        storage: "",
        description: "",
        extras: [],
        photos: []
    }
};

export default function editProduct(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_INPUT_EDIT_PRODUCT:
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };
        case types.EDIT_PRODUCT_GET_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                input: {
                    ...state.input,
                    ...action.payload.input
                }
            };
        case types.CLEAR_STATE_EDIT_PRODUCT:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
}
