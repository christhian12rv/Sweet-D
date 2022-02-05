import React from "react";

import Logo from "../../Logo";

import "./index.scss";

import DonutImg from "../../../img/donut-example.jpg";
import DonutImg2 from "../../../img/donut-example2.jpg";
import DonutImg3 from "../../../img/donut-example3.jpg";

const Login = () => {
    return (
        <div className="login">
            <div className="first-div">
                <Logo />
                <div className="message">
                    <h1>Seja bem vindo!</h1>
                    <p>
                        Faça login para continuar
                        <br />
                        com seu acesso
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
