import React from "react";
import { CgDetailsMore } from "react-icons/cg";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrdersActions from "../../../../store/actions/orders";

import UserSidebar from "../Sidebar";

import "./index.scss";

import Donut from "../../../../img/donut-example.jpg";

const Orders = ({ orders, getOrders }) => {
    return (
        <div className="user-orders">
            <UserSidebar active="orders" />
            <div className="content">
                <h2>Pedidos</h2>
                <div className="table-content-div">
                    <table>
                        <thead>
                            <tr>
                                <th>PRODUTOS</th>
                                <th>QUANTIDADE TOTAL</th>
                                <th>TOTAL</th>
                                <th>STATUS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="product">
                                    <img
                                        className="product-img"
                                        src={Donut}
                                    ></img>
                                    <div>
                                        <h4>
                                            Donuts doce, Bolo de Chocolate,
                                            Cupcake de Chocolate
                                        </h4>
                                        <p>#12345678</p>
                                    </div>
                                </td>
                                <td className="quantity">
                                    <div className="quantity-div">
                                        <h3>2</h3>
                                    </div>
                                </td>
                                <td>
                                    <h3>R$ 49,80</h3>
                                </td>
                                <td className="status finished">
                                    <div>Entregue</div>
                                </td>
                                <td className="details">
                                    <a>
                                        <CgDetailsMore className="icon" />
                                        Detalhes
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="product">
                                    <img
                                        className="product-img"
                                        src={Donut}
                                    ></img>
                                    <div>
                                        <h4>
                                            Donuts doce, Bolo de Chocolate,
                                            Cupcake de Chocolate
                                        </h4>
                                        <p>#12345678</p>
                                    </div>
                                </td>
                                <td className="quantity">
                                    <div className="quantity-div">
                                        <h3>2</h3>
                                    </div>
                                </td>
                                <td>
                                    <h3>R$ 49,80</h3>
                                </td>
                                <td className="status not-finished">
                                    <div>Em Andamento</div>
                                </td>
                                <td className="details">
                                    <a>
                                        <CgDetailsMore className="icon" />
                                        Detalhes
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="product">
                                    <img
                                        className="product-img"
                                        src={Donut}
                                    ></img>
                                    <div>
                                        <h4>
                                            Donuts doce, Bolo de Chocolate,
                                            Cupcake de Chocolate
                                        </h4>
                                        <p>#12345678</p>
                                    </div>
                                </td>
                                <td className="quantity">
                                    <div className="quantity-div">
                                        <h3>2</h3>
                                    </div>
                                </td>
                                <td>
                                    <h3>R$ 49,80</h3>
                                </td>
                                <td className="status finished">
                                    <div>Entregue</div>
                                </td>
                                <td className="details">
                                    <a>
                                        <CgDetailsMore className="icon" />
                                        Detalhes
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="product">
                                    <img
                                        className="product-img"
                                        src={Donut}
                                    ></img>
                                    <div>
                                        <h4>
                                            Donuts doce, Bolo de Chocolate,
                                            Cupcake de Chocolate
                                        </h4>
                                        <p>#12345678</p>
                                    </div>
                                </td>
                                <td className="quantity">
                                    <div className="quantity-div">
                                        <h3>2</h3>
                                    </div>
                                </td>
                                <td>
                                    <h3>R$ 49,80</h3>
                                </td>
                                <td className="status finished">
                                    <div>Entregue</div>
                                </td>
                                <td className="details">
                                    <a>
                                        <CgDetailsMore className="icon" />
                                        Detalhes
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    orders: state.orders.orders
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(OrdersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
