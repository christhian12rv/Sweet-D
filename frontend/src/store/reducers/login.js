const INITIAL_STATE = {
    email: "",
    password: ""
};

export default function login(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "LOGIN":
            return state;
        case "UPDATE_INPUT":
            return {
                ...state,
                [action.stateProp]: action.value
            };
        case "REDIRECT":
            return state;
        default:
            return state;
    }
}
