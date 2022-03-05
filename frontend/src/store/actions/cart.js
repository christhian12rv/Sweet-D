import types from "../types";
import axios from "axios";
import { toast } from "react-toastify";

export function addToCart(id, extras, quantity, toastId) {
    return async dispatch => {
        const response = await axios.post("/cart", {
            product: { id, extras, quantity }
        });

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        let data = response.data;

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

export function updateToCart(id, extras, quantity) {
    return async dispatch => {
        extras = extras.map(e => e.value);
        console.log(quantity);
        const response = await axios.put("/cart", {
            product: { id, extras, quantity }
        });

        let data = response.data;
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
                break;
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function removeToCart(id, productsData) {
    return async dispatch => {
        const response = await axios.delete("/cart/" + id);

        let data = response.data;
        console.log(data);

        productsData = productsData.filter(p => p.id != id);

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        ...data.session_products,
                        productsData: productsData
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

export function getCart() {
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

export function getProductsDataCart(productsCart) {
    console.log("asdffads");
    console.log(productsCart);
    return async dispatch => {
        productsCart = productsCart.map(p => p.id);

        const response = await axios.get(
            "/cart/data?productsIds=" + JSON.stringify(productsCart)
        );

        let data = response.data;

        data.products = data.products.map(p => {
            p.photos = JSON.parse(p.photos);
            p.extras = JSON.parse(p.extras);
            p.extras = p.extras.map(e => {
                e = { value: e, label: e };
                return e;
            });
            return p;
        });

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        productsData: data.products
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
