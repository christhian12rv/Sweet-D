import types from "../../types";

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

export default function addProductAdmin(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_INPUT_ADMIN_ADD_PRODUCT:
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };

        case types.CLEAR_STATE_ADMIN_ADD_PRODUCT:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
}
