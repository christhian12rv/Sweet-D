import React from "react";

import "./TextDiv.scss";

const TextDiv = () => {
    return (
        <div className="text-div">
            <h4>Os melhores doces feitos com os melhores ingredientes</h4>
            <h1>
                Doces de ótima qualidade feitos com <span>carinho</span>
                <br /> e uma pitada de <span>felicidade!</span>
            </h1>
        </div>
    );
};

export default TextDiv;
