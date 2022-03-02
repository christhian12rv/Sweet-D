import types from "../types";
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
    photos,
    toastId
) {
    console.log(photos);
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const dataForm = new FormData();
        dataForm.append("id", id);
        dataForm.append("name", name);
        dataForm.append("slug", slug);
        dataForm.append("price", price);
        dataForm.append("storage", storage);
        dataForm.append("description", description);
        if (extras && extras.length)
            dataForm.append("extras", JSON.stringify(extras));
        for (const photo of photos) {
            console.log(photo);
            if (photo.hasOwnProperty("url"))
                dataForm.append("bodyPhotos", JSON.stringify(photo));
            else dataForm.append("photos", photo);
        }
        dataForm.append("token", token);

        const response = await axios.put("/products/", dataForm);
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        console.log(data);
        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay: delay });
                dispatch({
                    type: types.CLEAR_STATE_ADD_PRODUCT
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
                    type: types.CLEAR_STATE_ADD_PRODUCT
                });
                return {
                    type: "REDIRECT",
                    to: "/"
                };
            default:
                dispatch({
                    type: types.CLEAR_STATE_ADD_PRODUCT
                });
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function getProduct(id, toastId) {
    return async dispatch => {
        const response = await axios.get("/products/" + id);

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.EDIT_PRODUCT_GET_SUCCESS,
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
                            photos: JSON.parse(data.product.photos)
                        }
                    }
                });
                return {
                    type: types.EDIT_PRODUCT_GET_SUCCESS,
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
        type: types.CLEAR_STATE_EDIT_PRODUCT
    };
}

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_EDIT_PRODUCT,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
