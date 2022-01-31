import React from "react";

import "./SquareButton.scss";

const SquareButton = ({ children }) => {
    return <button className="square-button">{children}</button>;
};

export default SquareButton;
