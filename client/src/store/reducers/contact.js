import types from "../constants";

const INITIAL_STATE = {
    send: false,
    input: {
        name: "",
        email: "",
        message: ""
    }
};

export default function contact(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.CONTACT_SEND_EMAIL:
            return { ...INITIAL_STATE };
        case types.UPDATE_INPUT_CONTACT:
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
