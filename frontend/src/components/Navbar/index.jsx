import React, { useState, useEffect } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";

import "./index.scss";

import Logo from "../Logo";

const Navbar = () => {
    let listener = null;
    const [scrollState, setScrollState] = useState("top");
    const [mobileMenuOpen, setMobileMenuOpen] = useState("");

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

    const handleMobileWrapperClick = () => {
        setMobileMenuOpen(mobileMenuOpen === "open" ? "" : "open");
    };

    return (
        <nav className={scrollState + " navbar"} id="navbar">
            <Logo />

            <div className={"mobile-wrapper " + mobileMenuOpen}>
                <AiOutlineMenu
                    className="icon"
                    onClick={handleMobileWrapperClick}
                />

                <div className="collapsable">
                    <ul className="center-ul">
                        <li>Home</li>
                        <li>Produtos</li>
                        <li>Quem Somos</li>
                        <li>Contato</li>
                    </ul>
                </div>
            </div>

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
