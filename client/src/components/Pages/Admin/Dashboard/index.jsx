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
    const chartOptionsOrdersPriceYear = useRef(null);
    const chartOptionsOrdersPriceMonth = useRef(null);

    const [optionsOrdersYear, setOptionsOrdersYear] = useState({});
    const [optionsOrdersMonth, setOptionsOrdersMonth] = useState({});
    const [optionsOrdersPriceYear, setOptionsOrdersPriceYear] = useState({});
    const [optionsOrdersPriceMonth, setOptionsOrdersPriceMonth] = useState({});

    const [dataTotalOrdersYear, setDataTotalOrdersYear] = useState({
        datasets: []
    });
    let [dataTotalOrdersMonth, setDataTotalOrdersMonth] = useState({
        datasets: []
    });
    const [dataTotalOrdersPriceYear, setDataTotalOrdersPriceYear] = useState({
        datasets: []
    });
    const [dataTotalOrdersPriceMonth, setDataTotalOrdersPriceMonth] = useState({
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

        // CHART 1
        setOptionsOrdersYear({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Total de Pedidos (" + year + ")"
                }
            }
        });

        let chart = chartOptionsOrdersYear.current;
        let createGradient = (ctx, area) => {
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
        };

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

        setDataTotalOrdersYear({
            labels: labelsTotalOrdersYear,
            datasets: [
                {
                    label: "Pedidos",
                    data: total.ordersTotalPerMonth,
                    backgroundColor: createGradient(chart.ctx, chart.chartArea)
                }
            ]
        });

        // CHART 2
        setOptionsOrdersMonth({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Total de Pedidos (" + month + ")"
                }
            }
        });

        chart = chartOptionsOrdersMonth.current;
        createGradient = (ctx, area) => {
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
        };

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

        // CHART 3
        setOptionsOrdersPriceYear({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Receita de Pedidos (" + year + ")"
                }
            }
        });

        chart = chartOptionsOrdersPriceYear.current;

        createGradient = (ctx, area) => {
            const colorStart = "#1a237e";
            const colorMid = "#1a237e";
            const colorEnd = "#c5cae9";

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
        };

        const labelsTotalOrdersPriceYear = [
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

        setDataTotalOrdersPriceYear({
            labels: labelsTotalOrdersPriceYear,
            datasets: [
                {
                    label: "Pedidos (R$)",
                    data: total.ordersTotalPricePerMonth,
                    backgroundColor: createGradient(chart.ctx, chart.chartArea)
                }
            ]
        });

        // CHART 4
        setOptionsOrdersPriceMonth({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Receita de Pedidos (" + month + ")"
                }
            }
        });

        chart = chartOptionsOrdersPriceMonth.current;

        const labelsTotalOrdersPriceMonth =
            total.ordersTotalPriceCurrentMonth.map((o, i) => i + 1);

        setDataTotalOrdersPriceMonth({
            labels: labelsTotalOrdersPriceMonth,
            datasets: [
                {
                    label: "Pedidos (R$)",
                    data: total.ordersTotalPriceCurrentMonth,
                    backgroundColor: createGradient(chart.ctx, chart.chartArea)
                }
            ]
        });
    }, [total]);

    console.log(total);

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
                    className="receipt-card"
                    title="Receita"
                    boxIconColor="#f3e5f5"
                    statistics={"R$ " + total.totalPriceOrders}
                    text="Receita (Total)"
                >
                    <BsCashCoin className="icon" style={{ color: "#4a148c" }} />
                </DashboardCard>
                <DashboardCard
                    className="receipt-card"
                    title="Receita"
                    boxIconColor="#e0f7fa"
                    statistics={"R$ " + total.totalPriceOrdersToday}
                    text="Receita (Hoje)"
                >
                    <MdToday className="icon" style={{ color: "#00e5ff" }} />
                </DashboardCard>
            </div>

            <div className="charts-container">
                <div className="chart">
                    <Bar
                        ref={chartOptionsOrdersYear}
                        options={optionsOrdersYear}
                        data={dataTotalOrdersYear}
                    />
                </div>
                <div className="chart">
                    <Bar
                        ref={chartOptionsOrdersMonth}
                        options={optionsOrdersMonth}
                        data={dataTotalOrdersMonth}
                    />
                </div>
                <div className="chart">
                    <Bar
                        ref={chartOptionsOrdersPriceYear}
                        options={optionsOrdersPriceYear}
                        data={dataTotalOrdersPriceYear}
                    />
                </div>
                <div className="chart">
                    <Bar
                        ref={chartOptionsOrdersPriceMonth}
                        options={optionsOrdersPriceMonth}
                        data={dataTotalOrdersPriceMonth}
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
