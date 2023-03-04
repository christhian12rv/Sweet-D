import types from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import config from '../../configs/config';

export function sendContactEmail(name, email, message, toastId) {
    return async dispatch => {
        const response = await axios.post(config.serverUrl + "/api/users/contact", {
            name,
            email,
            message
        });

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        let data = response.data;

        switch (data.status) {
            case 200:
                toastId.current = toast.success(data.msg, {
                    delay: delay
                });
                dispatch({
                    type: types.CONTACT_SEND_EMAIL
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

export function updateInput(value, stateProp) {
    return {
        type: types.UPDATE_INPUT_CONTACT,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
