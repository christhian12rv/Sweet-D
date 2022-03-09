import types from "../constants";

const INITIAL_STATE = {
    input: {
        name: "",
        email: "",
        password: "",
        delete: ""
    }
};

export default function userSettings(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_INPUT_USER_SETTINGS:
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };
        case types.CLEAR_STATE_USER_SETTINGS:
            return { ...state, INITIAL_STATE };
        default:
            return state;
    }
}
