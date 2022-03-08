import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { IoTrashBinSharp } from "react-icons/io5";
import { BsEmojiFrown } from "react-icons/bs";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CartActions from "../../../store/actions/cart";
import * as OrdersActions from "../../../store/actions/orders";

import SquareButton from "../../Buttons/SquareButton";
import RoundedButton from "../../Buttons/RoundedButton";
import ModalLoading from "../../ModalLoading";

import "./index.scss";

const Cart = ({
    cart,
    address,
    getProductsDataCart,
    updateToCart,
    removeToCart,
    createOrder
}) => {
    console.log(address);
    const toastId = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        setIsLoading(true);
        if (cart.products && cart.products.length) {
            const response = await getProductsDataCart(cart.products);
            if (response && response.type) {
                if (response.type == "REDIRECT") navigate(response.to);
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    useEffect(async () => {
        if (cart.products && cart.products.length) {
            const response = await getProductsDataCart(cart.products);
            if (response && response.type) {
                if (response.type == "REDIRECT") navigate(response.to);
            }
        }
    }, [cart.products]);

    const handleQuantityChange = async (product, index, func) => {
        let newValue = product.quantity;

        if (func == "add") {
            if (newValue < cart.productsData[index].storage) newValue += 1;
        } else if (func == "remove") {
            if (newValue > 1) newValue -= 1;
        }
        await updateToCart(product.id, product.extras, newValue);
    };

    const handleExtrasChange = async (product, value) => {
        await updateToCart(product.id, value, product.quantity);
    };

    const handleRemoveProduct = async id => {
        await removeToCart(id, cart.productsData);
    };

    const handleOrderSubmit = async () => {
        setIsLoading(true);
        const response = await createOrder(cart.products, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
            else if (response.type == "REDIRECT_SUCCESS") {
                navigate(response.to);
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="cart">
            {isLoading ? (
                <div className="modal-box">
                    <ModalLoading modalShow={isLoading} onDataTable={true} />
                </div>
            ) : (
                <div className="products-div">
                    {cart.productsData && cart.productsData.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>PRODUTO</th>
                                    <th>PREÇO</th>
                                    <th>EXTRAS</th>
                                    <th>QUANTIDADE</th>
                                    <th>TOTAL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.productsData &&
                                    cart.productsData.map((p, i) => (
                                        <tr key={i}>
                                            <td className="product">
                                                <img
                                                    className="product-img"
                                                    src={p.photos[0].url}
                                                ></img>
                                                <h4>{p.name}</h4>
                                            </td>
                                            <td>
                                                <h3>
                                                    R$
                                                    {" " +
                                                        p.price
                                                            .toFixed(2)
                                                            .toString()
                                                            .replace(".", ",")}
                                                </h3>
                                            </td>
                                            <td className="extra">
                                                <div className="box">
                                                    <Select
                                                        className="extras-select"
                                                        closeMenuOnSelect={
                                                            false
                                                        }
                                                        isMulti
                                                        options={p.extras}
                                                        value={
                                                            cart.products[i]
                                                                .extras
                                                        }
                                                        placeholder="Selecione algum extra"
                                                        onChange={v =>
                                                            handleExtrasChange(
                                                                cart.products[
                                                                    i
                                                                ],
                                                                v
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="quantity">
                                                <div className="quantity-div">
                                                    <HiMinusCircle
                                                        className="icon"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                cart.products[
                                                                    i
                                                                ],
                                                                i,
                                                                "remove"
                                                            )
                                                        }
                                                    />
                                                    <h3>
                                                        {
                                                            cart.products[i]
                                                                .quantity
                                                        }
                                                    </h3>
                                                    <HiPlusCircle
                                                        className="icon"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                cart.products[
                                                                    i
                                                                ],
                                                                i,
                                                                "add"
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <h3>
                                                    R$
                                                    {" " +
                                                        cart.products[i].total
                                                            .toFixed(2)
                                                            .toString()
                                                            .replace(".", ",")}
                                                </h3>
                                            </td>
                                            <td className="remove">
                                                <a
                                                    onClick={() =>
                                                        handleRemoveProduct(
                                                            p.id
                                                        )
                                                    }
                                                >
                                                    <IoTrashBinSharp className="icon" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty-cart">
                            <BsEmojiFrown className="icon" />
                            <h3>Seu carrinho está vazio</h3>
                            <h4>Adicione algo para me fazer feliz :)</h4>
                            <SquareButton onClick={() => navigate("/products")}>
                                Ver produtos
                            </SquareButton>
                        </div>
                    )}
                </div>
            )}
            {!isLoading && cart.productsData && cart.productsData.length && (
                <div className="checkout-div">
                    <div className="content">
                        <hr />
                        <h3>
                            <span className="lighter">SUBTOTAL: </span>
                            <span className="price">
                                R$
                                {" " +
                                    cart.total
                                        .toFixed(2)
                                        .toString()
                                        .replace(".", ",")}
                            </span>
                        </h3>
                        <h3>
                            <span className="lighter">PREÇO TOTAL: </span>
                            <span className="price">
                                R$
                                {" " +
                                    cart.total
                                        .toFixed(2)
                                        .toString()
                                        .replace(".", ",")}
                            </span>
                        </h3>

                        <div className="address-box">
                            <h3>Endereço</h3>
                            {address.address ? (
                                <>
                                    <div className="box">
                                        <p className="title">Endereço</p>
                                        <p>{address.address}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">Número</p>
                                        <p>{address.number}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">Bairro</p>
                                        <p>{address.district}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">CEP</p>
                                        <p>{address.postalCode}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">Cidade</p>
                                        <p>{address.city}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">Estado</p>
                                        <p>{address.state}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">Complemento</p>
                                        <p>{address.complement}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">Telefone</p>
                                        <p>{address.phone}</p>
                                    </div>
                                    <div className="box">
                                        <p className="title">Descrição</p>
                                        <p>{address.description}</p>
                                    </div>
                                    <a
                                        className="change-address"
                                        onClick={() =>
                                            navigate("/user/settings")
                                        }
                                    >
                                        Trocar
                                    </a>
                                </>
                            ) : (
                                <a
                                    className="add-address"
                                    onClick={() => navigate("/user/settings")}
                                >
                                    Adicione um endereço
                                </a>
                            )}
                        </div>

                        <RoundedButton onClick={handleOrderSubmit}>
                            Comprar
                        </RoundedButton>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    cart: state.cart,
    address: state.login.address
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(Object.assign({}, CartActions, OrdersActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
