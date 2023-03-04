import types from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import config from '../../configs/config';

export function sendEmail(email, toastId) {
    return async () => {
        const response = await axios.post(config.serverUrl + "/api/users/recovery-password", {
            email
        });
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay: delay });
                return {
                    type: "REDIRECT",
                    to: "/login"
                };
            case 400:
                data.errors.forEach((error, i) => {
                    toastId.current = toast.error(error.msg, {
                        delay: delay,
                        autoClose: 10000 * (i + 1)
                    });
                });
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

export function getCheckValidateToken(email, token, toastId) {
    return async () => {
        const response = await axios.post(
            config.serverUrl + "/api/users/recovery-password/change/verify",
            {
                email,
                token
            }
        );

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200: {
                return {
                    type: "SUCCESS"
                };
            }
            case 400:
                return {
                    type: "REDIRECT",
                    to: "/error/404"
                };
            default:
                toastId.current = toast.warning(data.msg, { delay: delay });
                return {
                    type: "REDIRECT",
                    to: "/error/500"
                };
        }
    };
}

export function changePassword(
    email,
    token,
    password,
    confirmPassword,
    toastId
) {
    return async () => {
        const response = await axios.post(
            config.serverUrl + "/api/users/recovery-password/change",
            {
                email,
                token,
                password,
                confirmPassword
            }
        );
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, { delay: delay });
                return {
                    type: "REDIRECT",
                    to: "/login"
                };
            case 400:
                data.errors.forEach((error, i) => {
                    toastId.current = toast.error(error.msg, {
                        delay: delay,
                        autoClose: 10000 * (i + 1)
                    });
                });
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

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_RECOVERY_PASSWORD,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
