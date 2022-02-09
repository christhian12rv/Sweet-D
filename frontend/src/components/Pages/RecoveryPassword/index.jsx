import React from "react";

import Logo from "../../Logo";
import InputText from "../../InputText";
import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const RecoveryPassword = () => {
    return (
        <div className="recovery-password">
            <div className="content">
                <img className="donut-img" src={Donut} />
                <div className="recovery-password-content-div">
                    <Logo />
                    <h2 className="recovery-password-title">Recuperar Senha</h2>
                    <div className="email-div">
                        <h5>Digite seu email</h5>
                        <div className="input-div">
                            <InputText />
                        </div>
                    </div>
                    <RoundedButton>Recuperar Senha</RoundedButton>
                    <RoundedButton>Login</RoundedButton>
                </div>
            </div>
        </div>
    );
};

export default RecoveryPassword;
