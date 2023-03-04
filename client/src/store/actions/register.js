import types from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import config from '../../configs/config';

export function register(name, email, password, confirmPassword, toastId) {
    return async () => {
        const response = await axios.post(config.serverUrl + "/api/users", {
            name,
            email,
            password,
            confirmPassword
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
                        autoClose: 5000 * (i + 1)
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
        type: types.UPDATE_INPUT_REGISTER,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
