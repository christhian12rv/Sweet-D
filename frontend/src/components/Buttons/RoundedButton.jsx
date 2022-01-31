import React from "react";

import "./RoundedButton.scss";

const RoundedButton = ({ children }) => {
    return <button className="rounded-button">{children}</button>;
};

export default RoundedButton;
