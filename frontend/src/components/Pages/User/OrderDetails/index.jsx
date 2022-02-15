import React from "react";

import UserSidebar from "../Sidebar";

import "./index.scss";

import Donut from "../../../../img/donut-example.jpg";

const OrderDetails = () => {
    return (
        <div className="user-orders-order">
            <UserSidebar active="orders" />
            <div className="user-orders-order-content">
                <h2 className="title">
                    Pedido <span>#12345678</span>
                </h2>
                <div className="row">
                    <div className="first-div">
                        <div className="table-content-div">
                            <table>
                                <thead>
                                    <tr>
                                        <th>PRODUTOS</th>
                                        <th>QUANTIDADE</th>
                                        <th>TOTAL</th>
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
                                                <h4>Donuts doce</h4>
                                                <p>#12345678</p>
                                                <h5>
                                                    Extras:&nbsp;
                                                    <span>
                                                        Chocolate granulado,
                                                        calda de chocolate
                                                    </span>
                                                </h5>
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
                                    </tr>
                                    <tr>
                                        <td className="product">
                                            <img
                                                className="product-img"
                                                src={Donut}
                                            ></img>
                                            <div>
                                                <h4>Donuts doce</h4>
                                                <p>#12345678</p>
                                                <h5>
                                                    Extras:&nbsp;
                                                    <span>
                                                        Chocolate granulado,
                                                        calda de chocolate
                                                    </span>
                                                </h5>
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
                                    </tr>
                                    <tr>
                                        <td className="product">
                                            <img
                                                className="product-img"
                                                src={Donut}
                                            ></img>
                                            <div>
                                                <h4>Donuts doce</h4>
                                                <p>#12345678</p>
                                                <h5>
                                                    Extras:&nbsp;
                                                    <span>
                                                        Chocolate granulado,
                                                        calda de chocolate
                                                    </span>
                                                </h5>
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
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="second-div">
                        <div className="content">
                            <hr />
                            <h3>
                                <span className="lighter">
                                    QUANTIDADE TOTAL:
                                </span>
                                <span className="to-right">6</span>
                            </h3>
                            <h3>
                                <span className="lighter">SUBTOTAL: </span>
                                <span className="to-right">R$ 99,60</span>
                            </h3>
                            <h3>
                                <span className="lighter">PREÇO TOTAL: </span>
                                <span className="to-right">R$ 99,60</span>
                            </h3>

                            <div className="details">
                                <h4>Detalhes</h4>
                                <h5>
                                    <span className="lighter">Data:</span>
                                    <span className="to-right">23/07/2021</span>
                                </h5>
                                <h5>
                                    <span className="lighter">Status:</span>
                                    <span className="to-right status finished">
                                        Entregue
                                    </span>
                                </h5>
                                <h5>
                                    <span className="lighter">
                                        Data de entrega:
                                    </span>
                                    <span className="to-right">23/07/2021</span>
                                </h5>
                                <h5>
                                    <span className="lighter">Endereço:</span>
                                    <span className="to-right address">
                                        Rua Leandro Silva da Cruz, 27, Centro,
                                        Uberlândia - MG
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
