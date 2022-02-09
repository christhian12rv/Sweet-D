import React from "react";
import { GoPerson, GoLock } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";

import Logo from "../../Logo";
import InputText from "../../InputText";
import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const Register = () => {
    return (
        <div className="register">
            <div className="content">
                <img className="donut-img" src={Donut} />
                <div className="first-div">
                    <div className="message">
                        <h1>Seja bem vindo!</h1>
                        <p>
                            Não tem uma conta?
                            <br />
                            Para registrar basta preencher
                            <br />
                            os campos ao lado e clicar em
                            <br />
                            Registrar
                        </p>
                    </div>
                </div>
                <div className="second-div">
                    <Logo />
                    <h2 className="register-title">Registrar</h2>
                    <div className="name-div">
                        <h5>Nome</h5>
                        <div className="input-div">
                            <GoPerson className="icon" />
                            <InputText />
                        </div>
                    </div>
                    <div className="email-div">
                        <h5>Email</h5>
                        <div className="input-div">
                            <MdAlternateEmail className="icon" />
                            <InputText />
                        </div>
                    </div>
                    <div className="password-div">
                        <h5>Senha</h5>
                        <div className="input-div">
                            <GoLock className="icon" />
                            <InputText />
                        </div>
                    </div>
                    <RoundedButton>Registrar</RoundedButton>
                    <RoundedButton>Já tem uma conta?</RoundedButton>
                </div>
            </div>
        </div>
    );
};

export default Register;
