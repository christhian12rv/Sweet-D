import React from "react";

import "./index.scss";

const FirstBanner = () => {
    return (
        <div className="first-banner">
            <h1>Produtos entregues para as regiões:</h1>
            <div className="regions-div">
                <h4>Uberlândia</h4>
                <h4>Patos de Minas</h4>
                <h4>Uberaba</h4>
                <h4>Monte Alegre</h4>
            </div>
        </div>
    );
};

export default FirstBanner;
