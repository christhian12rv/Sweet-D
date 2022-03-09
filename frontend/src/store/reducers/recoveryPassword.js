import types from "../constants";

const INITIAL_STATE = {
    input: {
        email: ""
    }
};

export default function recoveryPassword(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_INPUT_RECOVERY_PASSWORD:
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
