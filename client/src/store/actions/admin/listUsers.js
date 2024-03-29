import types from "../../constants";
import axios from "axios";
import config from '../../../configs/config';

export function getUsers(limit, page, columnSort, directionSort, search) {
    return async dispatch => {
        const response = await axios.get(
            config.serverUrl + "/api/users?limit=" +
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

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.ADMIN_LIST_USERS_GET_USERS,
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
