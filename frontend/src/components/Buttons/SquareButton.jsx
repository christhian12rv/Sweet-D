import React from "react";

import "./SquareButton.scss";

const SquareButton = ({ children, onClick, className }) => {
    return (
        <button
            className={"square-button " + (className ? className : "")}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default SquareButton;
