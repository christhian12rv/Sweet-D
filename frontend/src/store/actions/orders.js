import types from "../types";
import axios from "axios";
import { toast } from "react-toastify";

export function createOrder(products, address, toastId) {
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        products = products.map(p => {
            p.extras = p.extras.map(e => e.value);
            return p;
        });
        let response = await axios.post("/orders", {
            products,
            address,
            token
        });

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        let data = response.data;
        console.log(data);

        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay });
                response = await axios.post("/cart/clear");
                data = response.data;
                switch (data.status) {
                    case 200:
                        dispatch({ type: types.CART_CLEAR });
                        break;
                    case 500:
                        return {
                            type: "REDIRECT",
                            to: "/error/500"
                        };
                }
                return {
                    type: "REDIRECT_SUCCESS",
                    to: "/"
                };
                break;
            case 400:
                data.errors.forEach((error, i) => {
                    toastId.current = toast.error(error.msg, {
                        delay: delay,
                        autoClose: 5000 * (i + 1)
                    });
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

export function getOrders() {
    return async dispatch => {
        const response = await axios.get("/cart");

        const data = response.data;
        console.log(data);
        data.session_products.products = data.session_products.products.map(
            p => {
                p.extras = p.extras.map(e => {
                    e = { value: e, label: e };
                    return e;
                });

                return p;
            }
        );

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        ...data.session_products
                    }
                });
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}
