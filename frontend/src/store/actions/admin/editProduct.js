import types from "../../constants";
import axios from "axios";
import { toast } from "react-toastify";

export function editProduct(
    id,
    name,
    slug,
    price,
    storage,
    description,
    extras,
    priceExtras,
    photos,
    toastId
) {
    console.log(priceExtras);
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const dataForm = new FormData();
        dataForm.append("id", id);
        dataForm.append("name", name);
        dataForm.append("slug", slug);
        dataForm.append("price", price);
        dataForm.append("storage", storage);
        dataForm.append("description", description);
        if (extras && extras.length) {
            dataForm.append("extras", JSON.stringify(extras));
            dataForm.append("priceExtras", JSON.stringify(priceExtras));
        }
        for (const photo of photos) {
            if (photo.hasOwnProperty("url"))
                dataForm.append("bodyPhotos", JSON.stringify(photo));
            else dataForm.append("photos", photo);
        }
        dataForm.append("token", token);

        const response = await axios.put("/products/", dataForm);
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay: delay });
                dispatch({
                    type: types.CLEAR_STATE_ADMIN_ADD_PRODUCT
                });
                return {
                    type: "REDIRECT",
                    to: "/admin/products"
                };
            case 400:
                data.errors.forEach((error, i) => {
                    toastId.current = toast.error(error.msg, {
                        delay: delay,
                        autoClose: 5000 * (i + 1)
                    });
                });
                break;
            case 401:
                toastId.current = toast.error(data.msg, { delay: delay });
                dispatch({
                    type: types.CLEAR_STATE_ADMIN_ADD_PRODUCT
                });
                return {
                    type: "REDIRECT",
                    to: "/"
                };
            default:
                dispatch({
                    type: types.CLEAR_STATE_ADMIN_ADD_PRODUCT
                });
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function getProduct(slug, toastId) {
    return async dispatch => {
        const response = await axios.get("/products/" + slug);

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        if (data.product.extras) {
            data.product.priceExtras = JSON.parse(data.product.priceExtras).map(
                pe => pe.toString().replace(".", ",")
            );
        }
        console.log(data);

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.ADMIN_EDIT_PRODUCT_GET_SUCCESS,
                    payload: {
                        id: data.product.id,
                        input: {
                            name: data.product.name,
                            slug: data.product.slug,
                            price: data.product.price,
                            storage: data.product.storage,
                            ...(data.product.description && {
                                description: data.product.description
                            }),
                            ...(data.product.extras && {
                                extras: JSON.parse(data.product.extras)
                            }),
                            ...(data.product.extras && {
                                priceExtras: data.product.priceExtras
                            }),
                            photos: JSON.parse(data.product.photos)
                        }
                    }
                });
                return {
                    type: types.ADMIN_EDIT_PRODUCT_GET_SUCCESS,
                    photos: JSON.parse(data.product.photos)
                };
                break;
            case 400:
                data.errors.forEach((error, i) => {
                    toastId.current = toast.error(error.msg, {
                        delay: delay,
                        autoClose: 5000 * (i + 1)
                    });
                });
                return {
                    type: "REDIRECT",
                    to: "/admin/products"
                };
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function clearState() {
    return {
        type: types.CLEAR_STATE_ADMIN_EDIT_PRODUCT
    };
}

export function updateInput(value, stateProp, toastId, priceExtras, oldExtras) {
    return dispatch => {
        if (stateProp == "extras") {
            if (value.length < oldExtras.length) {
                let loopStop = false;
                oldExtras.forEach((e, i) => {
                    if (loopStop) return;
                    if (e != value[i]) {
                        priceExtras.splice(i, 1);
                        dispatch({
                            type: types.UPDATE_INPUT_ADMIN_EDIT_PRODUCT_PRICE_EXTRAS,
                            payload: {
                                input: {
                                    priceExtras
                                }
                            }
                        });
                        loopStop = true;
                    }
                });
            } else if (value.length > oldExtras.length) {
                if (oldExtras.indexOf(value[value.length - 1]) > -1) {
                    const delay = toast.isActive(toastId.current) ? 1000 : 0;
                    toast.dismiss();
                    toastId.current = toast.success(
                        "Você já adicionou um extra com esse nome",
                        { delay: delay }
                    );
                    return;
                }
            }
        }

        dispatch({
            type: types.UPDATE_INPUT_ADMIN_EDIT_PRODUCT,
            payload: {
                input: {
                    value,
                    stateProp
                }
            }
        });
    };
}

export function updateInputPriceExtras(value, index, priceExtras) {
    const newPriceExtras = [...priceExtras];
    newPriceExtras[index] = value;
    return {
        type: types.UPDATE_INPUT_ADMIN_EDIT_PRODUCT_PRICE_EXTRAS,
        payload: {
            input: {
                priceExtras: newPriceExtras
            }
        }
    };
}
