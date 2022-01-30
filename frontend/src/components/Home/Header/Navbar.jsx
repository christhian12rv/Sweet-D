import React from "react";

import { GiWrappedSweet } from "react-icons/gi";
import { BiLogInCircle } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";

import "./Navbar.scss";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li className="logo-li">
                    <GiWrappedSweet className="logo" />
                    Sweet-D
                </li>
            </ul>

            <ul className="center-ul">
                <li>Home</li>
                <li>Produtos</li>
                <li>Quem Somos</li>
                <li>Contato</li>
            </ul>
            <ul>
                <li className="login-li">
                    <BiLogInCircle className="login-icon" />
                    Login
                </li>
                <li className="cart-li">
                    <IoMdCart className="cart-icon" />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
