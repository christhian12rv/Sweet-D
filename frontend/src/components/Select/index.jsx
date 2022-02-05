import React from "react";

import "./index.scss";

const Select = ({ children }) => {
    return (
        <select className="select-input">
            <option value="">Filtrar por</option>
            {children}
        </select>
    );
};

export default Select;
