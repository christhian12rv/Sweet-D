import types from "../types";

const INITIAL_STATE = {
    input: {
        name: "",
        email: "",
        isAdmin: ""
    }
};

export default function userSettings(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_INPUT:
            return {
                ...state,
                [action.stateProp]: action.value
            };
        default:
            return state;
    }
}
