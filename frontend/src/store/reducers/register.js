const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
};

export default function register(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "REGISTER":
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
