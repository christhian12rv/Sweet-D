import React from "react";

import "./index.scss";

import Donut from "../../../img/Login/Donut.png";
import SquareButton from "../../Buttons/SquareButton";

const Error404 = () => {
    return (
        <div className="error-404">
            <div className="logo-404">
                <h1>4</h1>
                <img src={Donut} />
                <h1>4</h1>
            </div>
            <h1 className="oops">Oops! Página não encontrada</h1>
            <h2>A página que você está procurando não existe.</h2>
            <h2>
                Você pode voltar à página inicial ou tentar acessar uma nova
                página.
            </h2>
            <SquareButton>Voltar</SquareButton>
        </div>
    );
};

export default Error404;
