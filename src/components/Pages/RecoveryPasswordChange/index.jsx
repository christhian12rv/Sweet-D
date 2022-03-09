import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as RecoveryPasswordActions from "../../../store/actions/recoveryPassword";

import Logo from "../../Logo";
import InputPassword from "../../InputPassword";
import RoundedButton from "../../Buttons/RoundedButton";
import ModalLoading from "../../ModalLoading";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const RecoveryPasswordChange = ({
    password,
    confirmPassword,
    updateInput,
    getCheckValidateToken,
    changePassword
}) => {
    const { email, token } = useParams();

    const navigate = useNavigate();
    const toastId = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isGetting, setIsGetting] = useState(false);

    useEffect(async () => {
        setIsGetting(true);
        const response = await getCheckValidateToken(email, token, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
        setIsGetting(false);
    }, []);

    const handleChangePassword = async e => {
        e.preventDefault();
        setIsLoading(true);
        const response = await changePassword(
            email,
            token,
            password,
            confirmPassword,
            toastId
        );
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
        setIsLoading(false);
    };

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    return (
        <div className="recovery-password-change">
            {!isGetting && (
                <div className="content">
                    <ModalLoading modalShow={isLoading} />
                    <img className="donut-img" src={Donut} />
                    <div className="recovery-password-change-content-div">
                        <form onSubmit={handleChangePassword}>
                            <Logo />
                            <h2 className="recovery-password-change-title">
                                Recuperar Senha
                            </h2>
                            <div className="new-password-div">
                                <h5>Nova Senha</h5>
                                <div className="input-div">
                                    <InputPassword
                                        value={password}
                                        onChange={e =>
                                            handleInputChange(e, "password")
                                        }
                                    />
                                </div>
                            </div>
                            <div className="confirm-password-div">
                                <h5>Confirme sua senha</h5>
                                <div className="input-div">
                                    <InputPassword
                                        value={confirmPassword}
                                        onChange={e =>
                                            handleInputChange(
                                                e,
                                                "confirmPassword"
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <RoundedButton submit={true}>
                                Trocar senha
                            </RoundedButton>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    email: state.recoveryPassword.input.email,
    password: state.recoveryPassword.input.password,
    confirmPassword: state.recoveryPassword.input.confirmPassword
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(RecoveryPasswordActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecoveryPasswordChange);
