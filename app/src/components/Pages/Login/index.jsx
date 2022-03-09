import React from "react";
import { useNavigate } from "react-router-dom";
import { GoLock } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../../store/actions/login";

import Logo from "../../Logo";
import InputText from "../../InputText";
import InputPassword from "../../InputPassword";
import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";

const Login = ({ email, password, login, updateInput }) => {
    const navigate = useNavigate();
    const toastId = React.useRef(null);

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleLogin = async e => {
        e.preventDefault();
        const response = await login(email, password, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
            else if (response.type == "LOGIN_SUCCESS") navigate("/");
        }
    };

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

                    <form onSubmit={handleLogin}>
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
                            <div className="password-row-div">
                                <h5>Senha</h5>
                                <a
                                    onClick={() =>
                                        navigate("/recovery-password")
                                    }
                                >
                                    Esqueceu sua senha?
                                </a>
                            </div>
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
                        <RoundedButton submit={true}>Login</RoundedButton>
                        <RoundedButton onClick={() => navigate("/register")}>
                            Não tem uma conta?
                        </RoundedButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    email: state.login.input.email,
    password: state.login.input.password
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(LoginActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
