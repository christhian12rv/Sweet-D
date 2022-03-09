import types from "../../constants";
import axios from "axios";
import { toast } from "react-toastify";

export function addProduct(
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
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const dataForm = new FormData();
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
            dataForm.append("photos", photo);
        }
        dataForm.append("token", token);

        const response = await axios.post("/api/products/", dataForm);
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

export function clearState() {
    return {
        type: types.CLEAR_STATE_ADMIN_ADD_PRODUCT
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
                            type: types.UPDATE_INPUT_ADMIN_ADD_PRODUCT_PRICE_EXTRAS,
                            payload: {
                                input: {
                                    priceExtras
                                }
                            }
                        });
                        loopStop = true;
                    }
                });
            } else {
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
            type: types.UPDATE_INPUT_ADMIN_ADD_PRODUCT,
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
    priceExtras[index] = value;

    return {
        type: types.UPDATE_INPUT_ADMIN_ADD_PRODUCT_PRICE_EXTRAS,
        payload: {
            input: {
                priceExtras
            }
        }
    };
}
