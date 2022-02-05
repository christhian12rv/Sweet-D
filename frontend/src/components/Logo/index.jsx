import React from "react";

import { GiWrappedSweet } from "react-icons/gi";

import "./index.scss";

const Logo = () => {
    return (
        <ul className="logo-ul">
            <li className="logo-li">
                <GiWrappedSweet className="logo" />
                Sweet-D
            </li>
        </ul>
    );
};

export default Logo;
