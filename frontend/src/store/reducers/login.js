import types from "../types";

const INITIAL_STATE = {
    input: {
        email: "",
        password: ""
    },
    user: {
        id: null,
        name: "",
        email: "",
        isAdmin: false,
        auth: false
    }
};

export default function login(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN_FAIL:
            return state;
        case types.LOGIN_SUCCESS:
            return { ...state, user: action.payload.user };
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
