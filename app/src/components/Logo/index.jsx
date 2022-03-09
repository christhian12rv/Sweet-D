import React from "react";
import { useNavigate } from "react-router-dom";

import LogoImg from "../../img/Logo.png";

import "./index.scss";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <ul className="logo-ul" onClick={() => navigate("/")}>
            <li className="logo-li">
                <img className="logo" src={LogoImg} alt="" />
                <span>Sweet-D</span>
            </li>
        </ul>
    );
};

export default Logo;
