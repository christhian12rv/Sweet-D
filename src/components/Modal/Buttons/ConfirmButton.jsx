import React from "react";

import "./ConfirmButton.scss";

const ConfirmButton = ({ onClick, children, submit }) => {
    return (
        <button
            className="modal-confirm-button"
            onClick={onClick}
            type={submit ? "submit" : ""}
        >
            {children}
        </button>
    );
};

export default ConfirmButton;
