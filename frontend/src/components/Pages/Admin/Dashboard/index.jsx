import React from "react";
import { FiUsers, FiShoppingBag } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";

import DashboardCard from "./Card";

import "./index.scss";

const Dashboards = () => {
    return (
        <div className="admin-dashboard">
            <div className="first-statistics">
                <DashboardCard
                    title="Produtos"
                    boxIconColor="#fbe9e7"
                    statistics="29"
                    text="Produtos"
                >
                    <BiCookie className="icon" style={{ color: "#ff3d00" }} />
                </DashboardCard>
                <DashboardCard
                    title="Usuários"
                    boxIconColor="#e1f5fe"
                    statistics="320"
                    text="Usuários"
                >
                    <FiUsers className="icon" style={{ color: "#039be5" }} />
                </DashboardCard>
                <DashboardCard
                    title="Pedidos"
                    boxIconColor="#e8f5e9"
                    statistics="921"
                    text="Pedidos"
                >
                    <FiShoppingBag
                        className="icon"
                        style={{ color: "#00c853" }}
                    />
                </DashboardCard>
            </div>
        </div>
    );
};

export default Dashboards;
