import types from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

export function update(id, field, password, toastId) {
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const response = await axios.put("/users", {
            userId: id,
            password,
            data: {
                ...field
            },
            token
        });
        const data = response.data;

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        switch (data.status) {
            case 200:
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: {
                        user: { ...data.user, auth: true }
                    }
                });
                dispatch({
                    type: types.CLEAR_STATE_USER_SETTINGS
                });
                return {
                    type: "SUCCESS"
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

export function updateAddress(userId, address, toastId) {
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const response = await axios.post("/users/address", {
            userId,
            address: address.address,
            number: address.number,
            postalCode: address.postalCode,
            city: address.city,
            state: address.state,
            district: address.district,
            ...(address.complement &&
                address.complement.length && {
                    complement: address.complement
                }),
            ...(address.phone &&
                address.phone.length && {
                    phone: address.phone
                }),
            ...(address.description &&
                address.description.length && {
                    description: address.description
                }),
            token
        });
        const data = response.data;

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay: delay });
                dispatch({
                    type: types.LOGIN_SUCCESS_ADDRESS,
                    payload: {
                        address: { ...data.address }
                    }
                });
                dispatch({
                    type: types.CLEAR_STATE_USER_SETTINGS
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

export function deleteAccount(deleteInput, id, toastId) {
    return async dispatch => {
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        if (deleteInput !== "excluir")
            return (toastId.current = toast.error("Valor inválido", {
                delay: delay
            }));

        const token = localStorage.getItem("user_token");
        const response = await axios.post("/users/delete", { id, token });
        const data = response.data;
        console.log(data);

        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay: delay });
                dispatch({
                    type: types.CLEAR_STATE_USER_SETTINGS
                });
                return {
                    type: "SUCCESS"
                };
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

export function updateInput(value, stateProp, address = false) {
    if (address)
        return {
            type: types.UPDATE_LOGIN_ADDRESS,
            payload: {
                address: {
                    value,
                    stateProp
                }
            }
        };

    return {
        type: types.UPDATE_INPUT_USER_SETTINGS,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
