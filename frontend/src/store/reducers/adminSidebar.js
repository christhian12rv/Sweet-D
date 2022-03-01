import types from "../types";

const isOpen = localStorage.getItem("admin_sidebar_open");

const INITIAL_STATE = {
    open: isOpen ? (isOpen == "true" ? true : false) : true
};

export default function login(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.TOGGLE_ADMIN_SIDEBAR:
            return { open: action.payload.open };
        default:
            return state;
    }
}
