import React from "react";

import "./RoundedButton.scss";

const RoundedButton = ({ children, onClick }) => {
    return (
        <button className="rounded-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default RoundedButton;
