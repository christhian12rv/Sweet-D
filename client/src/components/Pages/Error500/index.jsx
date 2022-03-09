import React from "react";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";
import SquareButton from "../../Buttons/SquareButton";

const Error500 = () => {
    return (
        <div className="error-500">
            <div className="logo-500">
                <h1>5</h1>
                <img src={Donut} />
                <h1>0</h1>
            </div>
            <h1 className="oops">Erro interno do servidor</h1>
            <h2>Hm... Infelizmente, o servidor travou.</h2>
            <h2>Tente novamente mais tarde ou entre em contato conosco.</h2>
            <SquareButton>Voltar</SquareButton>
        </div>
    );
};

export default Error500;
