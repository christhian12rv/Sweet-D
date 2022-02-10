import React from "react";

import "./index.scss";

const InputText = ({ placeholder, value, readOnly, className }) => {
    return (
        <input
            className={"input-text " + className}
            type="text"
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
        />
    );
};

export default InputText;
