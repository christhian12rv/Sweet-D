import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiShoppingBag } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { BsList } from "react-icons/bs";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../../../store/actions/login";

import "./index.scss";

const Sidebar = ({ active, name }) => {
    const navigate = useNavigate();
    const [sidebarOpenMobile, setSidebarOpenMobile] = useState("closed");

    const handleSidebarOpen = () => {
        setSidebarOpenMobile(
            sidebarOpenMobile === "closed" ? "open" : "closed"
        );
    };

    return (
        <div className="user-sidebar ">
            <BsList
                className="icon-handle-sidebar"
                onClick={handleSidebarOpen}
            />
            <div className={"user-sidebar-content " + sidebarOpenMobile}>
                <div className="user-panel">
                    <GoPerson className="icon" />
                    <h4>{name.substr(0, name.indexOf(" "))}</h4>
                </div>
                <div
                    className={"item " + (active == "settings" ? "active" : "")}
                    onClick={() => navigate("/user/settings")}
                >
                    <div className="selector-border-top"></div>
                    <FiSettings className="icon" />
                    <h3>Conta</h3>
                    <div className="selector-border-bottom"></div>
                </div>
                <div
                    className={"item " + (active == "orders" ? "active" : "")}
                    onClick={() => navigate("/user/orders")}
                >
                    <div className="selector-border-top"></div>
                    <FiShoppingBag className="icon" />
                    <h3>Pedidos</h3>
                    <div className="selector-border-bottom"></div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.login.user.name
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(LoginActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
