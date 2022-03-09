import React from "react";

import "./SquareButton.scss";

const SquareButton = ({ children, onClick, className, id }) => {
    return (
        <button
            id={id ? id : ""}
            className={"square-button " + (className ? className : "")}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default SquareButton;
