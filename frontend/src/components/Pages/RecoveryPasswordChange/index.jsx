import React from "react";

import Logo from "../../Logo";
import InputText from "../../InputText";
import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const RecoveryPasswordChange = () => {
    return (
        <div className="recovery-password-change">
            <div className="content">
                <img className="donut-img" src={Donut} />
                <div className="recovery-password-change-content-div">
                    <Logo />
                    <h2 className="recovery-password-change-title">
                        Recuperar Senha
                    </h2>
                    <div className="new-password-div">
                        <h5>Nova Senha</h5>
                        <div className="input-div">
                            <InputText />
                        </div>
                    </div>
                    <div className="confirm-password-div">
                        <h5>Confirme sua senha</h5>
                        <div className="input-div">
                            <InputText />
                        </div>
                    </div>
                    <RoundedButton>Trocar senha</RoundedButton>
                </div>
            </div>
        </div>
    );
};

export default RecoveryPasswordChange;
