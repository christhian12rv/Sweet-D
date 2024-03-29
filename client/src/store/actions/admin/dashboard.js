import types from "../../constants";
import axios from "axios";
import config from '../../../configs/config';

export function getTotal() {
    return async dispatch => {
        const response = await axios.get(config.serverUrl + "/api/total");

        let data = response.data;
        data.total.totalPriceOrders = data.total.totalPriceOrders
            ? data.total.totalPriceOrders
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
            : 0;

        data.total.totalPriceOrdersToday = data.total.totalPriceOrdersToday
            ? data.total.totalPriceOrdersToday
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
            : 0;

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
