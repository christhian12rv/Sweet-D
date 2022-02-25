import React from "react";
import { FiSettings, FiShoppingBag } from "react-icons/fi";
import { GoPerson } from "react-icons/go";

import "./index.scss";

const Sidebar = ({ active }) => {
    return (
        <div className="user-sidebar">
            <div className="user-panel">
                <GoPerson className="icon" />
                <h4>Admin</h4>
            </div>
            <div className={"item " + (active == "settings" ? "active" : "")}>
                <div className="selector-border-top"></div>
                <FiSettings className="icon" />
                <h3>Conta</h3>
                <div className="selector-border-bottom"></div>
            </div>
            <div className={"item " + (active == "orders" ? "active" : "")}>
                <div className="selector-border-top"></div>
                <FiShoppingBag className="icon" />
                <h3>Pedidos</h3>
                <div className="selector-border-bottom"></div>
            </div>
        </div>
    );
};

export default Sidebar;
