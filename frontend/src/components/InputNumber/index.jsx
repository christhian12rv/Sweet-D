import React from "react";

import "./index.scss";

const InputNumber = ({ placeholder }) => {
    return (
        <input
            className="input-number"
            type="number"
            placeholder={placeholder}
        />
    );
};

export default InputNumber;
