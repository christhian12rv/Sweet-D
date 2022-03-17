import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { MdPhone, MdEmail } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ContactActions from "../../../store/actions/contact";

import InputText from "../../InputText";
import TextArea from "../../TextArea";
import RoundedButton from "../../Buttons/RoundedButton";
import ModalLoading from "../../ModalLoading";

import "./index.scss";

import VectorPersonalText from "../../../img/vector_personal_text.png";

const Contact = ({ name, email, message, updateInput, sendContactEmail }) => {
    const navigate = useNavigate();
    const toastId = useRef(null);

    const [modalShow, setModalShow] = useState(false);

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleContactSendEmail = async e => {
        e.preventDefault();
        setModalShow(true);
        const response = await sendContactEmail(name, email, message, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
        setModalShow(false);
    };

    return (
        <div className="contact-us">
            <div className="img-header">
                <div className="text">
                    <h1>Contate-nos!</h1>
                    <hr />
                    <p>
                        Conte para a gente a sua dúvida! Nos envie uma mensagem
                        ou email
                        <br />e entraremos em contato em até um dia útil.
                    </p>
                </div>
                <img src={VectorPersonalText} alt="" />
            </div>
            <div className="contacts-forms">
                <div className="content">
                    <div className="first">
                        <h3>
                            Entre em contato diretamente com a gente por meio de
                            uma dessas redes sociais!
                        </h3>
                        <ul>
                            <li className="facebook-icon">
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                >
                                    <BsFacebook />
                                </a>
                            </li>
                            <li className="whatsapp-icon">
                                <a
                                    href="https://wa.me/5538999689339"
                                    target="_blank"
                                >
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
                        <h3>
                            Ou se preferir, ligue para a gente por meio deste
                            telefone:
                        </h3>
                        <p>
                            <MdPhone className="icon" />
                            +55 (38) 99968-9339
                        </p>
                    </div>
                    <div className="second">
                        <ModalLoading modalShow={modalShow} />
                        <h3>Nos envie um email com sua dúvida!</h3>
                        <MdEmail className="email-icon" />
                        <form onSubmit={handleContactSendEmail}>
                            <InputText
                                placeholder="Nome"
                                value={name}
                                onChange={e => handleInputChange(e, "name")}
                            />
                            <InputText
                                placeholder="Email"
                                value={email}
                                onChange={e => handleInputChange(e, "email")}
                            />
                            <TextArea
                                rows={5}
                                placeholder="Mensagem..."
                                value={message}
                                onChange={e => handleInputChange(e, "message")}
                            />
                            <RoundedButton submit={true}>Enviar</RoundedButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.contact.input.name,
    email: state.contact.input.email,
    message: state.contact.input.message
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ContactActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
