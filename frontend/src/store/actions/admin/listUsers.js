import types from "../../types";
import axios from "axios";

export function getUsers(limit, page, columnSort, directionSort, search) {
    return async dispatch => {
        const response = await axios.get(
            "/users?limit=" +
                limit +
                "&page=" +
                page +
                "&columnSort=" +
                columnSort +
                "&directionSort=" +
                directionSort +
                "&search=" +
                search
        );

        const data = response.data;
        console.log(data);

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.LIST_USERS_GET_USERS,
                    payload: {
                        users: data.users,
                        limit,
                        page,
                        totalRows: data.totalRows,
                        columnSort,
                        directionSort
                    }
                });
                break;
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_ADMIN_LIST_USERS,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
