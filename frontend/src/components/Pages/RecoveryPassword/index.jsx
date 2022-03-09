import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as RecoveryPasswordActions from "../../../store/actions/recoveryPassword";

import Logo from "../../Logo";
import InputText from "../../InputText";
import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const RecoveryPassword = ({ email, updateInput, sendEmail }) => {
    const toastId = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleSendEMail = async () => {
        const response = await sendEmail(email, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
            else if (response.type == "LOGIN_SUCCESS") navigate("/");
        }
    };

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
