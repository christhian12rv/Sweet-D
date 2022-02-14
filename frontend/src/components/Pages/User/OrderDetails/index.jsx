import React from "react";

import UserSidebar from "../Sidebar";

import "./index.scss";

import Donut from "../../../../img/donut-example.jpg";

const OrderDetails = () => {
    return (
        <div className="user-settings">
            <UserSidebar active="orders" />
            <div className="content">
                <h2>
                    Pedido <span>#12345678</span>
                </h2>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
