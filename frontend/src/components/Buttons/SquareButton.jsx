import React from "react";

import "./SquareButton.scss";

const SquareButton = ({ children, onClick }) => {
    return (
        <button className="square-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default SquareButton;
