import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RequiredAuth = ({ isAdmin }) => {
    const toastId = React.useRef(null);
    const navigate = useNavigate();

    const getUserAuth = async () => {
        const token = localStorage.getItem("user_token");
        const response = await axios.post("/users/get-user-auth", {
            token
        });
        const data = response.data;
        console.log(data);
        switch (data.status) {
            case 200:
                return {
                    isAdmin: isAdmin
                        ? data.user.isAdmin
                            ? true
                            : false
                        : true,
                    auth: data.auth
                };
                break;
            case 401:
                localStorage.removeItem("user_token");
                return false;
                break;
            default:
                localStorage.removeItem("user_token");
                return false;
        }
    };

    useEffect(async () => {
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const userAuth = await getUserAuth();
        console.log(userAuth);
        if (!userAuth || !userAuth.auth) {
            navigate("/login");
        } else if (userAuth.auth) {
            console.log("asdf");
            if (!userAuth.isAdmin) {
                toastId.current = toast.error(
                    "Você não está autorizado a acessar essa página",
                    { delay: delay }
                );
                navigate("/");
            }
        }
    }, []);

    return <></>;
};

export default RequiredAuth;
