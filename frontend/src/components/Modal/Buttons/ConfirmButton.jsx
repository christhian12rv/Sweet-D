import React from "react";

import "./ConfirmButton.scss";

const ConfirmButton = ({ onClick, children }) => {
    return (
        <button className="modal-confirm-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default ConfirmButton;
