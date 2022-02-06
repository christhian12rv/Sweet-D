import React from "react";
import { GoPerson, GoLock } from "react-icons/go";

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
                        <h1>Seja bem vindo!</h1>
                        <p>
                            Faça login para continuar
                            <br />
                            com seu acesso
                        </p>
                    </div>
                </div>
                <div className="second-div">
                    <Logo />
                    <h2 className="login-title">Login</h2>
                    <div className="email-div">
                        <h5>Email</h5>
                        <div className="input-div">
                            <GoPerson className="icon" />
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
                </div>
            </div>
        </div>
    );
};

export default Login;
