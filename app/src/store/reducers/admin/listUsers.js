import types from "../../constants";

const INITIAL_STATE = {
    users: [],
    limit: 10,
    page: 1,
    totalRows: 0,
    columnSort: "id",
    directionSort: "asc",
    input: {
        search: ""
    }
};

export default function listUsersAdmin(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ADMIN_LIST_USERS_GET_USERS:
            return { ...state, ...action.payload };
        case types.UPDATE_INPUT_ADMIN_LIST_USERS:
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
