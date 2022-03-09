import React from "react";
import { useNavigate } from "react-router-dom";

import { BsFacebook } from "react-icons/bs";
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
                    <li className="facebook-icon">
                        <a href="https://www.facebook.com/" target="_blank">
                            <BsFacebook />
                        </a>
                    </li>
                    <li className="whatsapp-icon">
                        <a href="https://wa.me/5538999689339" target="_blank">
                            <IoLogoWhatsapp />
                        </a>
                    </li>
                    <li className="instagram-icon">
                        <a
                            href="https://www.instagram.com/fellypfn/"
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
                    Sweet D - Endereço: Rua Prefeito Leopoldo da Silva, 101 -
                    Santa Mônica - Uberlândia - MG/Brasil
                </p>
                <p> © Direitos Reservados www.sweetd.com.br</p>
            </div>
            <div className="footer-logo">
                <img className="logo" src={LogoImg} alt="" />
                <span>Sweet-D</span>
            </div>
        </footer>
    );
};

export default Footer;
