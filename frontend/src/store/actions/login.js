import axios from "axios";
import { toast } from "react-toastify";

export function login(email, password, toastId) {
    return async () => {
        const response = await axios.post("/users/login", {
            email,
            password
        });
        console.log(response);

        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const data = response.data;
        switch (data.status) {
            case 200:
                return {
                    type: "REDIRECT",
                    to: "/"
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

        return {
            type: "LOGIN",
            email,
            password
        };
    };
}

export function updateInput(value, stateProp) {
    return {
        type: "UPDATE_INPUT",
        value,
        stateProp
    };
}
