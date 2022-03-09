import React from "react";

import "./index.scss";

const InputNumber = ({
    min,
    max,
    value,
    onChange,
    placeholder,
    onInput,
    step
}) => {
    return (
        <input
            className="input-number"
            type="number"
            placeholder={placeholder}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            onInput={onInput}
            step={step}
        />
    );
};

export default InputNumber;
