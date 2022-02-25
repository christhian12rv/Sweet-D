import types from "../types";

const INITIAL_STATE = {
    open: true
};

export default function login(state = INITIAL_STATE, action) {
    console.log(action);
    switch (action.type) {
        case types.TOGGLE_ADMIN_SIDEBAR:
            return { open: action.payload.open };
        default:
            return state;
    }
}
