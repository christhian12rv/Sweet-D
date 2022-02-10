import React from "react";

import "./index.scss";

const InputText = ({ placeholder, value, readOnly }) => {
    return (
        <input
            className="input-password"
            type="password"
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
        />
    );
};

export default InputText;
