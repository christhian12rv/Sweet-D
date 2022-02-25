import types from "../types";
import axios from "axios";
import { toast } from "react-toastify";

export function login(email, password, toastId) {
    return async dispatch => {
        const response = await axios.post("/users/login", {
            email,
            password
        });
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                localStorage.setItem("user_token", data.token);
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: {
                        user: { ...data.user, auth: data.auth }
                    }
                });
                return {
                    type: "REDIRECT",
                    to: data.user.isAdmin ? "/admin/dashboard" : "/"
                };
            case 400:
                toastId.current = toast.error(data.msg, { delay: delay });
                break;
            default:
                toastId.current = toast.warning(data.msg, { delay: delay });
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function logout() {
    return async () => {
        const token = localStorage.getItem("user_token");
        const response = await axios.post("/users/logout", {
            token
        });
        const data = response.data;

        switch (data.status) {
            case 200:
                localStorage.removeItem("user_token");
                return {
                    type: "REDIRECT",
                    to: "/"
                };
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

export function getUserAuth() {
    return async dispatch => {
        const token = localStorage.getItem("user_token");
        const response = await axios.post("/users/get-user-auth", {
            token
        });

        const data = response.data;
        switch (data.status) {
            case 200:
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: {
                        user: {
                            id: data.user.id,
                            name: data.user.name,
                            email: data.user.email,
                            isAdmin: data.user.isAdmin,
                            auth: data.auth
                        },
                        ...(data.address && {
                            address: {
                                address: data.address.address,
                                number: data.address.number,
                                postalCode: data.address.postalCode,
                                city: data.address.city,
                                state: data.address.state,
                                district: data.address.district,
                                complement: data.address.complement
                                    ? data.address.complement
                                    : "",
                                phone: data.address.phone
                                    ? data.address.phone
                                    : "",
                                description: data.address.description
                                    ? data.address.description
                                    : ""
                            }
                        })
                    }
                });
                break;
            case 401:
                localStorage.removeItem("user_token");
                dispatch({
                    type: types.LOGIN_FAIL,
                    payload: {
                        user: {
                            id: null,
                            name: "",
                            email: "",
                            isAdmin: false,
                            auth: false
                        },
                        address: {
                            address: "",
                            number: "",
                            postalCode: "",
                            city: "",
                            state: "",
                            district: "",
                            complement: "",
                            phone: "",
                            description: ""
                        }
                    }
                });
                return {
                    type: "REDIRECT",
                    to: "/"
                };
            default:
                localStorage.removeItem("user_token");
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_LOGIN,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
