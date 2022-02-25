import React from "react";
import { useNavigate } from "react-router-dom";

import { GiWrappedSweet } from "react-icons/gi";

import "./index.scss";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <ul className="logo-ul" onClick={() => navigate("/")}>
            <li className="logo-li">
                <GiWrappedSweet className="logo" />
                <span>Sweet-D</span>
            </li>
        </ul>
    );
};

export default Logo;
