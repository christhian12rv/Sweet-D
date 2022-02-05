import React, { useState, useEffect } from "react";

import { BiLogInCircle } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";

import "./index.scss";

import Logo from "../Logo";

const Navbar = () => {
    let listener = null;
    const [scrollState, setScrollState] = useState("top");

    useEffect(() => {
        listener = document.addEventListener("scroll", e => {
            var scrolled = document.scrollingElement.scrollTop;
            if (scrolled >= 420) {
                if (scrollState !== "bottom") {
                    setScrollState("bottom");
                }
            } else {
                if (scrollState !== "top") {
                    setScrollState("top");
                }
            }
        });
        return () => {
            document.removeEventListener("scroll", listener);
        };
    }, [scrollState]);

    return (
        <nav className={scrollState + " navbar"} id="navbar">
            <Logo />

            <ul className="center-ul">
                <li>Home</li>
                <li>Produtos</li>
                <li>Quem Somos</li>
                <li>Contato</li>
            </ul>
            <ul className="login-ul">
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
