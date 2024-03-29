import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrdersActions from "../../../../store/actions/orders";

import UserSidebar from "../Sidebar";

import "./index.scss";

import Donut from "../../../../img/donut-example.jpg";

const Orders = ({ orders, getOrdersByUser, clearState }) => {
    const navigate = useNavigate();

    useEffect(async () => {
        await clearState();
        const response = await getOrdersByUser(-1, 1, "createdAt", "desc", "");
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);
    return (
        <div className="user-orders">
            <UserSidebar active="orders" />
            <div className="content">
                <h2>Pedidos</h2>
                {orders && orders.length ? (
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
                                {orders.map((o, i) => {
                                    let productsName = [];
                                    o.orderProducts.forEach(p => {
                                        productsName.push(p.product.name);
                                    });
                                    productsName = productsName.join(", ");

                                    return (
                                        <tr key={i}>
                                            <td className="product">
                                                <img
                                                    className="product-img"
                                                    src={
                                                        JSON.parse(
                                                            o.orderProducts[0]
                                                                .product.photos
                                                        )[0].url
                                                    }
                                                ></img>
                                                <div>
                                                    <h4>{productsName}</h4>
                                                    <p className="product-id">
                                                        #{o.id}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="quantity">
                                                <div className="quantity-div">
                                                    <h3>{o.quantityTotal}</h3>
                                                </div>
                                            </td>
                                            <td className="total">
                                                <h3>
                                                    R${" "}
                                                    {" " +
                                                        parseFloat(o.total)
                                                            .toFixed(2)
                                                            .toString()
                                                            .replace(".", ",")}
                                                </h3>
                                            </td>
                                            <td
                                                className={
                                                    "status " +
                                                    (o.finished
                                                        ? "finished"
                                                        : "not-finished")
                                                }
                                            >
                                                <div>
                                                    {o.finished ? (
                                                        <div className="status-answer">
                                                            <IoMdCheckmarkCircleOutline />
                                                            Entregue
                                                        </div>
                                                    ) : (
                                                        <div className="status-answer">
                                                            <MdAccessTime />
                                                            Em andamento
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="details">
                                                <a
                                                    onClick={() =>
                                                        navigate(
                                                            "/user/orders/" +
                                                                o.id
                                                        )
                                                    }
                                                >
                                                    <CgDetailsMore className="icon" />
                                                    Detalhes
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="not-order">
                        Você ainda não fez nenhum pedido...
                    </h3>
                )}
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
