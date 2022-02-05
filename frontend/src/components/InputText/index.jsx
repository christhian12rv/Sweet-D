import React from "react";

import "./index.scss";

const InputText = ({ placeholder }) => {
    return (
        <input className="input-text" type="text" placeholder={placeholder} />
    );
};

export default InputText;
