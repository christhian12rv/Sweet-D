import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

import "./index.scss";

import CancelButton from "./Buttons/CancelButton";
import ConfirmButton from "./Buttons/ConfirmButton";

Modal.setAppElement("#root");

const ModalApp = ({
    children,
    isOpen,
    setIsOpen,
    onAfterOpen,
    cancelButton,
    confirmButton,
    confirmButtonText,
    confirmButtonOnClick,
    form
}) => {
    const closeModal = () => {
        setIsOpen(false);
    };

    const handleCancelButton = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            className="app-modal"
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={closeModal}
            contentLabel="Example"
            style={{ overlay: { zIndex: 999999999 } }}
        >
            <MdClose className="close-icon" onClick={closeModal} />
            {form ? (
                <form onSubmit={confirmButtonOnClick}>
                    {children}
                    <div className="buttons-row">
                        {cancelButton && (
                            <CancelButton onClick={handleCancelButton} />
                        )}
                        {confirmButton && (
                            <ConfirmButton submit={true}>
                                {confirmButtonText}
                            </ConfirmButton>
                        )}
                    </div>
                </form>
            ) : (
                <>
                    {children}
                    <div className="buttons-row">
                        {cancelButton && (
                            <CancelButton onClick={handleCancelButton} />
                        )}
                        {confirmButton && (
                            <ConfirmButton onClick={confirmButtonOnClick}>
                                {confirmButtonText}
                            </ConfirmButton>
                        )}
                    </div>
                </>
            )}
        </Modal>
    );
};

export default ModalApp;
