import types from "../constants";

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
        case types.UPDATE_INPUT_REGISTER:
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
