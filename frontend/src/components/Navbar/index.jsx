import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiSettings, FiShoppingBag } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CartActions from "../../store/actions/cart";
import * as LoginActions from "../../store/actions/login";

import "./index.scss";

import Logo from "../Logo";

const Navbar = ({
    activePage,
    name,
    isAdmin,
    auth,
    cart,
    getUserAuth,
    logout,
    getCart
}) => {
    console.log(auth);
    const navigate = useNavigate();
    let listener = null;

    const [scrollState, setScrollState] = useState("top");
    const [mobileMenuOpen, setMobileMenuOpen] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState("");
    const [isGettingUser, setIsGettingUser] = useState(true);

    useEffect(async () => {
        setIsGettingUser(true);
        await getUserAuth();
        setIsGettingUser(false);
    }, []);

    useEffect(async () => {
        if (!isGettingUser) await getUserAuth();
    });

    useEffect(async () => {
        await getCart();
    }, []);

    useEffect(() => {
        listener = document.addEventListener("scroll", e => {
            const navbarHome = document
                .getElementById("navbar")
                .classList.contains("home");
            let scrolled = document.scrollingElement.scrollTop;
            if (scrolled >= 420) {
                if (scrollState !== "bottom") {
                    setScrollState("bottom" + (navbarHome ? " home" : ""));
                }
            } else {
                if (scrollState !== "top") {
                    setScrollState("top" + (navbarHome ? " home" : ""));
                }
            }
        });
        return () => {
            document.removeEventListener("scroll", listener);
        };
    }, [scrollState]);

    const handleDropdownOpen = () => {
        if (dropdownOpen == "") setDropdownOpen("open");
        else if (dropdownOpen == "open") setDropdownOpen("");
    };

    const handleMobileWrapperClick = () => {
        setMobileMenuOpen(mobileMenuOpen === "open" ? "" : "open");
    };

    const handleNavigate = routePath => {
        if (document.getElementById("navbar").classList.contains("home"))
            document.getElementById("navbar").classList.remove("home");
        navigate(routePath);
    };

    const handleLogout = async () => {
        const response = await logout();
        if (response && response.type)
            if (response.type == "REDIRECT")
                if (response.to == "/error/500") navigate(response.to);
                else window.location.reload(true);
    };

    const centerUl = (
        <ul className="center-ul">
            <li
                className={activePage == 1 ? "active" : ""}
                onClick={() => navigate("/")}
            >
                Home
            </li>
            <li
                className={activePage == 2 ? "active" : ""}
                onClick={() => handleNavigate("/products")}
            >
                Produtos
            </li>
            <li
                className={activePage == 3 ? "active" : ""}
                onClick={() => handleNavigate("/")}
            >
                Quem Somos
            </li>
            <li
                className={activePage == 4 ? "active" : ""}
                onClick={() => handleNavigate("/")}
            >
                Contato
            </li>
        </ul>
    );

    return (
        <nav className={scrollState + " navbar"} id="navbar">
            <Logo />

            <div className={"mobile-wrapper " + mobileMenuOpen}>
                <AiOutlineMenu
                    className="icon"
                    onClick={handleMobileWrapperClick}
                />

                <div className="collapsable">{centerUl}</div>
            </div>

            {centerUl}
            <ul className="login-ul">
                {!isGettingUser && (
                    <>
                        {!auth ? (
                            <>
                                <li
                                    className="login-li"
                                    onClick={() => handleNavigate("/login")}
                                >
                                    <BiLogInCircle className="login-icon" />
                                    Login
                                </li>
                            </>
                        ) : (
                            <>
                                <li
                                    className="login-li user-logged"
                                    onClick={handleDropdownOpen}
                                >
                                    {name.substr(0, name.indexOf(" "))
                                        ? name.substr(0, name.indexOf(" "))
                                        : name}
                                    <GoPerson className="person-icon" />

                                    <div
                                        className={"dropdown " + dropdownOpen}
                                        id="user-dropdown"
                                    >
                                        <ul className="dropdown-ul">
                                            {isAdmin && (
                                                <li
                                                    onClick={() =>
                                                        handleNavigate(
                                                            "/admin/dashboard"
                                                        )
                                                    }
                                                >
                                                    <MdOutlineAdminPanelSettings className="icon" />
                                                    Painel de controle
                                                </li>
                                            )}

                                            <li
                                                onClick={() =>
                                                    handleNavigate(
                                                        "/user/settings"
                                                    )
                                                }
                                            >
                                                <FiSettings className="icon" />
                                                Configurações
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleNavigate(
                                                        "/user/orders"
                                                    )
                                                }
                                            >
                                                <FiShoppingBag className="icon" />
                                                Meus pedidos
                                            </li>
                                            <li onClick={handleLogout}>
                                                <BiLogOutCircle className="icon" />
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </>
                        )}
                    </>
                )}
                <li className="cart-li" onClick={() => handleNavigate("/cart")}>
                    <IoMdCart className="cart-icon" />
                    <span
                        className={
                            "cart-count" +
                            (cart.products &&
                            cart.products.length &&
                            cart.products.length > 9
                                ? " plus"
                                : "")
                        }
                    >
                        {cart.products && cart.products.length
                            ? cart.products.length
                            : 0}
                    </span>
                </li>
            </ul>
        </nav>
    );
};

const mapStateToProps = state => ({
    name: state.login.user.name,
    email: state.login.user.email,
    isAdmin: state.login.user.isAdmin,
    auth: state.login.user.auth,
    cart: state.cart
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(Object.assign({}, CartActions, LoginActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
