import React from "react";

import "./index.scss";

const ModalLoading = ({ modalShow, onDataTable }) => {
    return (
        <div
            className={
                "modal-loading-promise-container " +
                (modalShow || onDataTable ? "show " : "") +
                (onDataTable ? "on-data-table" : "")
            }
        >
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        </div>
    );
};

export default ModalLoading;
