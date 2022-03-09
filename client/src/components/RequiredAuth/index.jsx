import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RequiredAuth = ({ children, isAdmin }) => {
    const toastId = React.useRef(null);
    const navigate = useNavigate();

    const [authVerified, setAuthVerified] = useState(false);

    const getUserAuth = async () => {
        const token = localStorage.getItem("user_token");
        const response = await axios.post("/apiusers/get-user-auth", {
            token
        });
        const data = response.data;
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
            case 401:
                localStorage.removeItem("user_token");
                return false;
            default:
                localStorage.removeItem("user_token");
                return false;
        }
    };

    useEffect(async () => {
        const delay = toast.isActive(toastId.current) ? 1000 : 0;
        toast.dismiss();

        const userAuth = await getUserAuth();
        if (!userAuth || !userAuth.auth) {
            navigate("/login");
        } else if (userAuth.auth) {
            if (!userAuth.isAdmin) {
                toastId.current = toast.error(
                    "Você não está autorizado a acessar essa página",
                    { delay: delay }
                );
                navigate("/");
            } else setAuthVerified(true);
        }
    }, []);

    return <>{authVerified && children}</>;
};

export default RequiredAuth;
