import React from "react";
import { useNavigate } from "react-router-dom";

import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";

import LogoImg from "../../img/Logo.png";

import "./index.scss";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div id="contato" className="contato">
                <h2>Formas de contato</h2>
                <ul>
                    <li className="whatsapp-icon">
                        <a href="https://wa.me/5538999689339" target="_blank">
                            <IoLogoWhatsapp />
                        </a>
                    </li>
                    <li className="instagram-icon">
                        <a
                            href="https://www.instagram.com/fellpzzzz/"
                            target="_blank"
                        >
                            <AiFillInstagram />
                        </a>
                    </li>
                </ul>
                <p>+55 (38) 99968-9339</p>
            </div>
            <hr />
            <div className="address">
                <p>
                    Sweet D - Santa Mônica - Uberlândia - MG/Brasil
                </p>
                <p> © Direitos Reservados sweet-d.herokuapp.com</p>
            </div>
            <div className="footer-logo">
                <img className="logo" src={LogoImg} alt="" />
                <span>Sweet-D</span>
            </div>
        </footer>
    );
};

export default Footer;
