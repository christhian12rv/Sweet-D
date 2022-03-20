import React, { useState, useEffect, useRef } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");
import { FiUsers, FiShoppingBag } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { MdToday, MdOutlineReceiptLong } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DashboardAdminActions from "../../../../store/actions/admin/dashboard";

import DashboardCard from "./Card";

import "./index.scss";

const Dashboard = ({ total, getTotal }) => {
    const chartOptionsOrdersYear = useRef(null);
    const chartOptionsOrdersMonth = useRef(null);
    const [optionsOrdersYear, setOptionsOrdersYear] = useState({});
    const [optionsOrdersMonth, setOptionsOrdersMonth] = useState({});
    const [data, setData] = useState({ datasets: [] });
    let [dataTotalOrdersMonth, setDataTotalOrdersMonth] = useState({
        datasets: []
    });

    useEffect(async () => {
        const response = await getTotal();
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    useEffect(() => {
        const year = moment().year();
        let month = moment().format("MMMM");
        month = month.charAt(0).toUpperCase() + month.slice(1);

        setOptionsOrdersYear({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Pedidos (" + year + ")"
                }
            }
        });

        let chart = chartOptionsOrdersYear.current;
        function createGradient(ctx, area) {
            const colorStart = "#76ff03";
            const colorMid = "#76ff03";
            const colorEnd = "#b0ff57";

            const gradient = ctx.createLinearGradient(
                0,
                area.bottom,
                0,
                area.top
            );

            gradient.addColorStop(0, colorStart);
            gradient.addColorStop(0.5, colorMid);
            gradient.addColorStop(1, colorEnd);

            return gradient;
        }

        const labelsTotalOrdersYear = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];

        setData({
            labels: labelsTotalOrdersYear,
            datasets: [
                {
                    label: "Pedidos",
                    data: total.ordersTotalPerMonth,
                    backgroundColor: createGradient(chart.ctx, chart.chartArea)
                }
            ]
        });

        setOptionsOrdersMonth({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Pedidos (" + month + ")"
                }
            }
        });

        chart = chartOptionsOrdersMonth.current;
        function createGradient(ctx, area) {
            const colorStart = "#76ff03";
            const colorMid = "#76ff03";
            const colorEnd = "#b0ff57";

            const gradient = ctx.createLinearGradient(
                0,
                area.bottom,
                0,
                area.top
            );

            gradient.addColorStop(0, colorStart);
            gradient.addColorStop(0.5, colorMid);
            gradient.addColorStop(1, colorEnd);

            return gradient;
        }

        const labelsTotalOrdersMonth = total.ordersTotalCurrentMonth.map(
            (o, i) => i + 1
        );

        setDataTotalOrdersMonth({
            labels: labelsTotalOrdersMonth,
            datasets: [
                {
                    label: "Pedidos",
                    data: total.ordersTotalCurrentMonth,
                    backgroundColor: createGradient(chart.ctx, chart.chartArea)
                }
            ]
        });
    }, [total]);

    console.log(data);

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
                    text="Pedidos (Total)"
                >
                    <FiShoppingBag
                        className="icon"
                        style={{ color: "#00c853" }}
                    />
                </DashboardCard>
                <DashboardCard
                    title="Pedidos"
                    boxIconColor="#ffffb3#ffffb3"
                    statistics={total.ordersToday}
                    text="Pedidos (Hoje)"
                >
                    <MdOutlineReceiptLong
                        className="icon"
                        style={{ color: "#aeea00" }}
                    />
                </DashboardCard>
                <DashboardCard
                    title="Receita"
                    boxIconColor="#f3e5f5"
                    statistics={"R$ " + total.totalPriceOrders}
                    text="Receita (Total)"
                >
                    <BsCashCoin className="icon" style={{ color: "#4a148c" }} />
                </DashboardCard>
                <DashboardCard
                    title="Receita"
                    boxIconColor="#e0f7fa"
                    statistics={"R$ " + total.totalPriceOrdersToday}
                    text="Receita (Hoje)"
                >
                    <MdToday className="icon" style={{ color: "#00e5ff" }} />
                </DashboardCard>

                <div className="total-orders-chart">
                    <Bar
                        ref={chartOptionsOrdersYear}
                        options={optionsOrdersYear}
                        data={data}
                    />
                </div>
                <div className="total-orders-chart">
                    <Bar
                        ref={chartOptionsOrdersMonth}
                        options={optionsOrdersMonth}
                        data={dataTotalOrdersMonth}
                    />
                </div>
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
