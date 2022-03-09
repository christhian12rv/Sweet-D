import React from "react";

import "./index.scss";

const InputPassword = ({
    placeholder,
    value,
    readOnly,
    className,
    onChange
}) => {
    return (
        <input
            className={"input-password " + className}
            type="password"
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
        />
    );
};

export default InputPassword;
