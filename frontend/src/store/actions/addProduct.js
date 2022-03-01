import types from "../types";
import axios from "axios";
import { toast } from "react-toastify";

export function addProduct(
    name,
    slug,
    price,
    storage,
    description,
    extras,
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
        if (extras && extras.length)
            dataForm.append("extras", JSON.stringify(extras));
        for (const photo of photos) {
            dataForm.append("photos", photo);
        }
        dataForm.append("token", token);

        const response = await axios.post("/products/", dataForm);
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        console.log(data);
        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay: delay });
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
                return {
                    type: "REDIRECT",
                    to: "/"
                };
            default:
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_ADD_PRODUCT,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
