import types from "../types";

const INITIAL_STATE = {
    input: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
};

export default function register(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.REGISTER:
            return state;
        case types.UPDATE_INPUT:
            return {
                ...state,
                input: {
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };
        default:
            return state;
    }
}
