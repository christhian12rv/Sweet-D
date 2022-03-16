import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import Moment from "react-moment";
import "moment-timezone";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrdersActions from "../../../../store/actions/orders";

import "./index.scss";

const OrderDetails = ({ order, getOrder, clearState }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(async () => {
        await clearState();
        const response = await getOrder(id);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    return (
        <div className="admin-order-details">
            {order && (
                <>
                    <div className="row">
                        <div className="first-div">
                            <div className="admin-orders-order-header">
                                <BsArrowLeftShort
                                    className="back-page"
                                    onClick={() => navigate("/admin/orders")}
                                />
                            </div>
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
                                        {order.orderProducts.map((o, i) => (
                                            <tr
                                                key={i}
                                                onClick={() =>
                                                    navigate(
                                                        "/products/" +
                                                            o.product.slug
                                                    )
                                                }
                                            >
                                                <td className="product">
                                                    <img
                                                        className="product-img"
                                                        src={
                                                            JSON.parse(
                                                                o.product.photos
                                                            )[0].url
                                                        }
                                                    ></img>
                                                    <div>
                                                        <h4 className="product-name">
                                                            {o.product.name}{" "}
                                                            <span>
                                                                #{o.productId}
                                                            </span>
                                                        </h4>
                                                        <p></p>
                                                        <h5>
                                                            Extras:&nbsp;
                                                            {JSON.parse(
                                                                o.extras
                                                            ).map(
                                                                (
                                                                    e,
                                                                    i,
                                                                    array
                                                                ) => (
                                                                    <span>
                                                                        {array.length -
                                                                            1 ==
                                                                        i
                                                                            ? e +
                                                                              " (R$ " +
                                                                              parseFloat(
                                                                                  JSON.parse(
                                                                                      o.priceExtras
                                                                                  )[
                                                                                      i
                                                                                  ]
                                                                              )
                                                                                  .toFixed(
                                                                                      2
                                                                                  )
                                                                                  .toString()
                                                                                  .replace(
                                                                                      ".",
                                                                                      ","
                                                                                  ) +
                                                                              ")"
                                                                            : e +
                                                                              " (R$ " +
                                                                              parseFloat(
                                                                                  JSON.parse(
                                                                                      o.priceExtras
                                                                                  )[
                                                                                      i
                                                                                  ]
                                                                              )
                                                                                  .toFixed(
                                                                                      2
                                                                                  )
                                                                                  .toString()
                                                                                  .replace(
                                                                                      ".",
                                                                                      ","
                                                                                  ) +
                                                                              ")" +
                                                                              ", "}
                                                                    </span>
                                                                )
                                                            )}
                                                        </h5>
                                                    </div>
                                                </td>
                                                <td className="quantity">
                                                    <div className="quantity-div">
                                                        <h3>{o.quantity}</h3>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h3>
                                                        R$
                                                        {" " +
                                                            o.total
                                                                .toFixed(2)
                                                                .toString()
                                                                .replace(
                                                                    ".",
                                                                    ","
                                                                )}
                                                    </h3>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="user-details">
                                    <h3>Usuário</h3>
                                    <div className="user-box">
                                        <div className="box">
                                            <p className="title">Email</p>
                                            <p>
                                                {order.user ? (
                                                    order.user.email
                                                ) : (
                                                    <span className="user-anonym">
                                                        Anônimo
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="box">
                                            <p className="title">Nome</p>
                                            <p>
                                                {order.user ? (
                                                    order.user.name
                                                ) : (
                                                    <span className="user-anonym">
                                                        Anônimo
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="second-div">
                            <div className="content">
                                <hr />
                                <h3>
                                    <span className="lighter">
                                        QUANTIDADE TOTAL:
                                    </span>
                                    <span className="to-right">
                                        {order.quantityTotal}
                                    </span>
                                </h3>
                                <h3>
                                    <span className="lighter">SUBTOTAL: </span>
                                    <span className="to-right">
                                        R$
                                        {" " +
                                            order.total
                                                .toFixed(2)
                                                .toString()
                                                .replace(".", ",")}
                                    </span>
                                </h3>
                                <h3>
                                    <span className="lighter">
                                        PREÇO TOTAL:{" "}
                                    </span>
                                    <span className="to-right">
                                        R$
                                        {" " +
                                            order.total
                                                .toFixed(2)
                                                .toString()
                                                .replace(".", ",")}
                                    </span>
                                </h3>

                                <div className="details">
                                    <h4>Detalhes</h4>
                                    <h5>
                                        <span className="lighter">Data:</span>
                                        <span className="to-right">
                                            {
                                                <Moment
                                                    format="DD/MM/YYYY - HH:mm:ss"
                                                    tz="America/Sao_Paulo"
                                                >
                                                    {order.createdAt}
                                                </Moment>
                                            }
                                        </span>
                                    </h5>
                                    <h5>
                                        <span className="lighter">Status:</span>
                                        {order.finished ? (
                                            <span className="to-right status finished">
                                                Finalizado
                                            </span>
                                        ) : (
                                            <span className="to-right status not-finished">
                                                Em andamento
                                            </span>
                                        )}
                                    </h5>
                                    <h5>
                                        <span className="lighter">
                                            Data de entrega:
                                        </span>
                                        <span className="to-right">
                                            {order.finished && (
                                                <Moment
                                                    format="DD/MM/YYYY - HH:mm:ss"
                                                    tz="America/Sao_Paulo"
                                                >
                                                    {order.updatedAt}
                                                </Moment>
                                            )}
                                        </span>
                                    </h5>
                                    <h5 className="address">
                                        <span className="lighter">
                                            Endereço:
                                        </span>
                                    </h5>
                                    <div className="address-box">
                                        <div className="box address-address">
                                            <p className="title">Endereço</p>
                                            <p>{order.address.address}</p>
                                        </div>
                                        <div className="box">
                                            <p className="title">Número</p>
                                            <p>{order.address.number}</p>
                                        </div>
                                        <div className="box">
                                            <p className="title">Bairro</p>
                                            <p>{order.address.district}</p>
                                        </div>
                                        <div className="box">
                                            <p className="title">CEP</p>
                                            <p>{order.address.postalCode}</p>
                                        </div>
                                        <div className="box">
                                            <p className="title">Cidade</p>
                                            <p>{order.address.city}</p>
                                        </div>
                                        <div className="box">
                                            <p className="title">Estado</p>
                                            <p>{order.address.state}</p>
                                        </div>
                                        <div className="box">
                                            <p className="title">Complemento</p>
                                            <p>{order.address.complement}</p>
                                        </div>
                                        <div className="box">
                                            <p className="title">Telefone</p>
                                            <p>{order.address.phone}</p>
                                        </div>
                                        <div className="box description">
                                            <p className="title">Descrição</p>
                                            <p>{order.address.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    order: state.orders.viewOrder
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(OrdersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
