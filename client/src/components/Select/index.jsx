import React from "react";

import "./index.scss";

const Select = ({ children, value, onChange }) => {
    return (
        <select className="select-input" value={value} onChange={onChange}>
            <option value="">Filtrar por</option>
            {children}
        </select>
    );
};

export default Select;
