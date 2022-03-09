import React from "react";

import "./index.scss";

const InputText = ({
    placeholder,
    value,
    readOnly,
    className,
    onChange,
    innerRef
}) => {
    return (
        <>
            <input
                className={"input-text " + className}
                type="text"
                placeholder={placeholder}
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                ref={innerRef}
            />
        </>
    );
};

export default InputText;
