import types from "../types";

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

export default function listUsers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LIST_USERS_GET_USERS:
            return { ...state, ...action.payload };
        case types.UPDATE_INPUT_LIST_USERS:
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
