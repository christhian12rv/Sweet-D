import types from "../types";

const INITIAL_STATE = {
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

export default function addProduct(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_INPUT_ADD_PRODUCT:
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };

        case types.CLEAR_STATE_ADD_PRODUCT:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
}
