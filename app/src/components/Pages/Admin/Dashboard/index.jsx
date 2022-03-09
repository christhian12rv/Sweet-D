import React, { useEffect } from "react";
import { FiUsers, FiShoppingBag } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DashboardAdminActions from "../../../../store/actions/admin/dashboard";

import DashboardCard from "./Card";

import "./index.scss";

const Dashboard = ({ total, getTotal }) => {
    useEffect(async () => {
        const response = await getTotal();
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="first-statistics">
                <DashboardCard
                    title="Produtos"
                    boxIconColor="#fbe9e7"
                    statistics={total.products}
                    text="Produtos"
                >
                    <BiCookie className="icon" style={{ color: "#ff3d00" }} />
                </DashboardCard>
                <DashboardCard
                    title="Usuários"
                    boxIconColor="#e1f5fe"
                    statistics={total.users}
                    text="Usuários"
                >
                    <FiUsers className="icon" style={{ color: "#039be5" }} />
                </DashboardCard>
                <DashboardCard
                    title="Pedidos"
                    boxIconColor="#e8f5e9"
                    statistics={total.orders}
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

const mapStateToProps = state => ({
    total: state.dashboardAdmin.total
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(DashboardAdminActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
