import React from "react";
import { GoLock } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";

import Logo from "../../Logo";
import InputText from "../../InputText";
import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const Login = () => {
    return (
        <div className="login">
            <div className="content">
                <img className="donut-img" src={Donut} />
                <div className="first-div">
                    <div className="message">
                        <h1>Olá!</h1>
                    </div>
                </div>
                <div className="second-div">
                    <Logo />
                    <h2 className="login-title">Login</h2>
                    <div className="email-div">
                        <h5>Email</h5>
                        <div className="input-div">
                            <MdAlternateEmail className="icon" />
                            <InputText />
                        </div>
                    </div>
                    <div className="password-div">
                        <div className="password-row-div">
                            <h5>Senha</h5>
                            <a>Esqueceu sua senha?</a>
                        </div>
                        <div className="input-div">
                            <GoLock className="icon" />
                            <InputText />
                        </div>
                    </div>
                    <RoundedButton>Login</RoundedButton>
                    <RoundedButton>Não tem uma conta?</RoundedButton>
                </div>
            </div>
        </div>
    );
};

export default Login;
