import types from "../../constants";
import axios from "axios";

export function getTotal() {
    return async dispatch => {
        const response = await axios.get("/total");
        console.log(response);

        const data = response.data;
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.ADMIN_DASHBOARD_GET_TOTAL,
                    payload: {
                        total: data.total
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
