import types from "../constants";
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

        switch (data.status) {
            case 200:
                data.session_products.products =
                    data.session_products.products.map(p => {
                        p.extras = p.extras.map(e => {
                            e = { value: e, label: e };
                            return e;
                        });

                        return p;
                    });
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        ...data.session_products,
                        sessionTotalProducts:
                            data.session_products.products.length
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
                return {
                    type: "ERROR"
                };
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
        const response = await axios.put("/cart", {
            product: { id, extras, quantity },
            isBuyProduct: false
        });

        let data = response.data;
        switch (data.status) {
            case 200:
                data.session_products.products =
                    data.session_products.products.map(p => {
                        p.extras = p.extras.map(e => {
                            e = { value: e, label: e };
                            return e;
                        });

                        return p;
                    });
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        ...data.session_products,
                        sessionTotalProducts:
                            data.session_products.products.length
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

        productsData = productsData.filter(p => p.id != id);

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        ...data.session_products,
                        productsData: productsData,
                        sessionTotalProducts:
                            data.session_products.products.length
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
        switch (data.status) {
            case 200:
                data.session_products.products =
                    data.session_products.products.map(p => {
                        p.extras = p.extras.map(e => {
                            e = { value: e, label: e };
                            return e;
                        });

                        return p;
                    });
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        ...data.session_products,
                        sessionTotalProducts:
                            data.session_products.products.length
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
    return async dispatch => {
        productsCart = productsCart.map(p => p.id);

        const response = await axios.get(
            "/cart/data?productsIds=" + JSON.stringify(productsCart)
        );

        let data = response.data;

        data.products = data.products.map(p => {
            p.photos = JSON.parse(p.photos);
            p.extras = JSON.parse(p.extras);
            p.priceExtras = JSON.parse(p.priceExtras);
            p.extras = p.extras.map((e, i) => {
                e = {
                    value: e,
                    label:
                        e +
                        " - R$ " +
                        parseFloat(p.priceExtras[i])
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")
                };
                return e;
            });
            return p;
        });
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        productsData: data.products,
                        sessionTotalProducts: data.products.length
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

export function getOneProductCart(slug) {
    return async dispatch => {
        const response = await axios.get("/products/" + slug);

        const data = response.data;
        data.product.photos = JSON.parse(data.product.photos);
        if (data.product.extras) {
            data.product.extras = JSON.parse(data.product.extras);
            data.product.priceExtras = JSON.parse(data.product.priceExtras);
            data.product.extras = data.product.extras.map((e, i) => {
                e = {
                    value: e,
                    label:
                        e +
                        " - R$ " +
                        parseFloat(data.product.priceExtras[i])
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")
                };
                return e;
            });
        }

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        products: [
                            {
                                id: data.product.id,
                                extras: [],
                                priceExtras: [],
                                quantity: 1,
                                total: data.product.price
                            }
                        ],
                        productsData: [data.product],
                        total: data.product.price
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

export function addToCartBuyOneProduct(
    id,
    extras,
    priceExtras,
    quantity,
    total
) {
    return {
        type: types.CART_ADD_PRODUCT,
        payload: {
            products: [{ id, extras, priceExtras, quantity, total }],
            total
        }
    };
}

export function updateToCartBuyOne(
    id,
    extras,
    priceExtras,
    quantity,
    productPrice,
    productData
) {
    let extrasPriceTotal = 0;
    if (extras && extras.length) {
        extras.forEach((e, i) => {
            let eFindIndex;
            productData.extras.forEach((e2, i) => {
                if (e2.value == e.value) eFindIndex = i;
            });
            extrasPriceTotal += parseFloat(productData.priceExtras[eFindIndex]);
            priceExtras.push({ ...productData.priceExtras[eFindIndex] });
        });
    }
    console.log(productPrice);
    console.log(quantity);
    console.log(extrasPriceTotal);

    return {
        type: types.CART_ADD_PRODUCT,
        payload: {
            products: [
                {
                    id,
                    extras,
                    priceExtras,
                    quantity,
                    total: productPrice * quantity + extrasPriceTotal * quantity
                }
            ],
            total: productPrice * quantity + extrasPriceTotal * quantity
        }
    };
}

export function getTotalSessionCart() {
    return async dispatch => {
        const response = await axios.get("/cart/get/total");
        const data = response.data;
        console.log(data);
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        sessionTotalProducts: data.sessionTotalProducts
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

export function clearStateCart() {
    console.log("a");
    return {
        type: types.CART_CLEAR
    };
}
