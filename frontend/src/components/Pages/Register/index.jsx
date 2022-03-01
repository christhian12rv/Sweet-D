import React from "react";
import { useNavigate } from "react-router-dom";
import { GoPerson, GoLock } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as RegisterActions from "../../../store/actions/register";

import Logo from "../../Logo";
import InputText from "../../InputText";
import InputPassword from "../../InputPassword";
import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const Register = ({
    name,
    email,
    password,
    confirmPassword,
    register,
    updateInput
}) => {
    const navigate = useNavigate();
    const toastId = React.useRef(null);

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleRegister = async e => {
        e.preventDefault();
        const response = await register(
            name,
            email,
            password,
            confirmPassword,
            toastId
        );
        if (response && response.type)
            if (response.type == "REDIRECT") navigate(response.to);
    };

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
                    <form onSubmit={handleRegister}>
                        <div className="name-div">
                            <h5>Nome</h5>
                            <div className="input-div">
                                <GoPerson className="icon" />
                                <InputText
                                    value={name}
                                    onChange={e => handleInputChange(e, "name")}
                                />
                            </div>
                        </div>
                        <div className="email-div">
                            <h5>Email</h5>
                            <div className="input-div">
                                <MdAlternateEmail className="icon" />
                                <InputText
                                    value={email}
                                    onChange={e =>
                                        handleInputChange(e, "email")
                                    }
                                />
                            </div>
                        </div>
                        <div className="password-div">
                            <h5>Senha</h5>
                            <div className="input-div">
                                <GoLock className="icon" />
                                <InputPassword
                                    value={password}
                                    onChange={e =>
                                        handleInputChange(e, "password")
                                    }
                                />
                            </div>
                        </div>
                        <div className="password-div">
                            <h5>Confirmar senha</h5>
                            <div className="input-div">
                                <GoLock className="icon" />
                                <InputPassword
                                    value={confirmPassword}
                                    onChange={e =>
                                        handleInputChange(e, "confirmPassword")
                                    }
                                />
                            </div>
                        </div>
                        <RoundedButton submit={true}>Registrar</RoundedButton>
                        <RoundedButton onClick={() => navigate("/login")}>
                            Já tem uma conta?
                        </RoundedButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.register.input.name,
    email: state.register.input.email,
    password: state.register.input.password,
    confirmPassword: state.register.input.confirmPassword
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(RegisterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
