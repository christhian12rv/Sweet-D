import types from "../../constants";

const INITIAL_STATE = {
    total: {
        products: "",
        users: "",
        orders: "",
        totalPriceOrders: "",
        totalPriceOrdersToday: "",
        ordersTotalPerMonth: [],
        ordersTotalCurrentMonth: [],
        ordersTotalPricePerMonth: [],
        ordersTotalPriceCurrentMonth: []
    }
};

export default function dashboardAdmin(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ADMIN_DASHBOARD_GET_TOTAL:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
