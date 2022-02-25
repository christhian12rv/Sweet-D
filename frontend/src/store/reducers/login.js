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
    },
    address: {
        address: "",
        number: "",
        postalCode: "",
        city: "",
        state: "",
        district: "",
        complement: "",
        phone: "",
        description: ""
    }
};

export default function login(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN_FAIL:
            return state;
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                ...(action.payload.address && {
                    address: action.payload.address
                })
            };
        case types.LOGIN_SUCCESS_ADDRESS:
            return { ...state, address: action.payload.address };
        case types.UPDATE_INPUT_LOGIN:
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.input.stateProp]: action.payload.input.value
                }
            };
        case types.UPDATE_LOGIN_ADDRESS:
            return {
                ...state,
                address: {
                    ...state.address,
                    [action.payload.address.stateProp]:
                        action.payload.address.value
                }
            };
        default:
            return state;
    }
}
