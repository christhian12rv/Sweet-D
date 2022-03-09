import React from "react";

import "./CancelButton.scss";

const CancelButton = ({ onClick }) => {
    return (
        <button className="modal-cancel-button" onClick={onClick}>
            Cancelar
        </button>
    );
};

export default CancelButton;
