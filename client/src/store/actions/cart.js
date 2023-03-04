import types from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import config from '../../configs/config';

export function addToCart(id, extras, quantity, toastId) {
    return async dispatch => {
        const response = await axios.post(config.serverUrl + "/api/cart", {
            product: { id, extras, quantity }
        });

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        let data = response.data;

        switch (data.status) {
            case 200:
                data.session_products.products =
                    !!data.session_products.products ? data.session_products.products.map(p => {
                        p.extras = p.extras.map(e => {
                            e = { value: e, label: e };
                            return e;
                        });

                        return p;
                    }) : [];
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
        const response = await axios.put(config.serverUrl + "/api/cart", {
            product: { id, extras, quantity },
            isBuyProduct: false
        });

        let data = response.data;
        switch (data.status) {
            case 200:
                data.session_products.products =
                    !!data.session_products.products ? data.session_products.products.map(p => {
                        p.extras = p.extras
                            ? p.extras.map(e => {
                                  e = { value: e, label: e };
                                  return e;
                              })
                            : p.extras;

                        return p;
                    }) : [];
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
        const response = await axios.delete(config.serverUrl + "/api/cart/" + id);

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
        const response = await axios.get(config.serverUrl + "/api/cart");

        const data = response.data;
        switch (data.status) {
            case 200:
                data.session_products.products =
                    !!data.session_products.products ? data.session_products.products.map(p => {
                        p.extras = p.extras.map(e => {
                            e = { value: e, label: e };
                            return e;
                        });

                        return p;
                    }) : [];
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
        const productsCartData = productsCart;
        productsCart = productsCart.map(p => p.id);

        const response = await axios.get(
            config.serverUrl + "/api/cart/data?productsIds=" + JSON.stringify(productsCart)
        );

        let data = response.data;

        data.products = data.products.map(p => {
            p.photos = JSON.parse(p.photos);
            p.extras = JSON.parse(p.extras);
            p.priceExtras = JSON.parse(p.priceExtras);
            p.extras = p.extras
                ? p.extras.map((e, i) => {
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
                  })
                : p.extras;
            return p;
        });
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        products: productsCartData,
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

export function getOneProductCart(slug, productsState) {
    return async dispatch => {
        const response = await axios.get(config.serverUrl + "/api/products/" + slug);

        const data = response.data;
        data.product.photos = JSON.parse(data.product.photos);
        let extras, priceExtras, priceExtrasTotal, quantity, total;
        if (data.product.extras) {
            data.product.extras = JSON.parse(data.product.extras);
            data.product.priceExtras = JSON.parse(data.product.priceExtras);

            if (productsState[0]) {
                extras = productsState[0].extras;
                priceExtras = [];
                priceExtrasTotal = 0;
                productsState[0].extras.forEach((e, i) => {
                    const eFindIndex = data.product.extras.indexOf(e.value);
                    priceExtras.push(data.product.priceExtras[eFindIndex]);
                    priceExtrasTotal += parseFloat(
                        data.product.priceExtras[eFindIndex]
                    );
                });
                quantity = productsState[0].quantity;
                total =
                    data.product.price * quantity + priceExtrasTotal * quantity;
            } else {
                extras = [];
                priceExtras = [];
                quantity = 1;
                total = data.product.price;
            }
            data.product.extras = data.product.extras
                ? data.product.extras.map((e, i) => {
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
                  })
                : [];
        } else {
            extras = [];
            priceExtras = [];
            priceExtrasTotal = 0;
            quantity = 1;
            total = data.product.price;
        }
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.CART_ADD_PRODUCT,
                    payload: {
                        products: [
                            {
                                id: data.product.id,
                                extras,
                                priceExtras,
                                quantity,
                                total
                            }
                        ],
                        productsData: [data.product],
                        total
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
        const response = await axios.get(config.serverUrl + "/api/cart/get/total");
        const data = response.data;
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
    return {
        type: types.CART_CLEAR
    };
}
