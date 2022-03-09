import React from "react";

import "./index.scss";

const TextArea = ({
    placeholder,
    value,
    readOnly,
    className,
    onChange,
    rows
}) => {
    return (
        <textarea
            className={"text-area " + className}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
            rows={rows}
        />
    );
};

export default TextArea;
