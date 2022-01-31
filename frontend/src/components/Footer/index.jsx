import React from "react";

import { BsFacebook } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { GiWrappedSweet } from "react-icons/gi";

import "./index.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div id="contato" className="contato">
                <h2>Formas de contato</h2>
                <ul>
                    <li className="facebook-icon">
                        <BsFacebook />
                    </li>
                    <li className="whatsapp-icon">
                        <IoLogoWhatsapp />
                    </li>
                    <li className="instagram-icon">
                        <AiFillInstagram />
                    </li>
                </ul>
                <p>+55 (11) 91234-1234</p>
            </div>
            <hr />
            <div className="address">
                <p>
                    Sweet D - Endereço: Rua Prefeito Leopoldo da Silva, 101 -
                    Santa Mônica - Uberlândia - MG/Brasil
                </p>
                <p> © Direitos Reservados www.sweetd.com.br</p>
            </div>
            <div className="footer-logo">
                <GiWrappedSweet className="logo" />
                <span>Sweet-D</span>
            </div>
        </footer>
    );
};

export default Footer;
