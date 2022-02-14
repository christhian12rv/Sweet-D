import React from "react";
import { FiSettings, FiShoppingBag } from "react-icons/fi";

import "./index.scss";

const Sidebar = ({ active }) => {
    return (
        <div className="user-sidebar">
            <div className={"item " + (active == "settings" ? "active" : "")}>
                <FiSettings className="icon" />
                <h3>Conta</h3>
            </div>
            <div className={"item " + (active == "orders" ? "active" : "")}>
                <FiShoppingBag className="icon" />
                <h3>Pedidos</h3>
            </div>
        </div>
    );
};

export default Sidebar;
