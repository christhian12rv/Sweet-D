import React from "react";

import "./RoundedButton.scss";

const RoundedButton = ({ children, onClick, submit }) => {
    return (
        <button
            className="rounded-button"
            onClick={onClick}
            type={submit ? "submit" : ""}
        >
            {children}
        </button>
    );
};

export default RoundedButton;
