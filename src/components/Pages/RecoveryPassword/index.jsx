import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as RecoveryPasswordActions from "../../../store/actions/recoveryPassword";

import Logo from "../../Logo";
import InputText from "../../InputText";
import RoundedButton from "../../Buttons/RoundedButton";
import ModalLoading from "../../ModalLoading";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const RecoveryPassword = ({ email, updateInput, sendEmail }) => {
    const toastId = useRef(null);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleSendEMail = async () => {
        setIsLoading(true);
        const response = await sendEmail(email, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
        setIsLoading(false);
    };

    return (
        <div className="recovery-password">
            <div className="content">
                <ModalLoading modalShow={isLoading} />
                <img className="donut-img" src={Donut} />
                <div className="recovery-password-content-div">
                    <Logo />
                    <h2 className="recovery-password-title">Recuperar Senha</h2>
                    <div className="email-div">
                        <h5>Digite seu email</h5>
                        <div className="input-div">
                            <InputText
                                value={email}
                                onChange={e => handleInputChange(e, "email")}
                            />
                        </div>
                    </div>
                    <RoundedButton onClick={handleSendEMail}>
                        Recuperar Senha
                    </RoundedButton>
                    <RoundedButton>Login</RoundedButton>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    email: state.recoveryPassword.input.email
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(RecoveryPasswordActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryPassword);
