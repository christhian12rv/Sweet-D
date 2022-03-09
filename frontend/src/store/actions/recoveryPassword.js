import types from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

export function sendEmail(email, toastId) {
    return async dispatch => {
        const response = await axios.post("/users/recovery-password", {
            email
        });
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                return {
                    type: "REDIRECT",
                    to: "/change/a"
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
        type: types.UPDATE_INPUT_RECOVERY_PASSWORD,
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
