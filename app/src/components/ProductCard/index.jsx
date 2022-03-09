import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import parse from "html-react-parser";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CartActions from "../../store/actions/cart";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoMdCart, IoMdSquare } from "react-icons/io";

import SquareButton from "../Buttons/SquareButton";

import "./index.scss";

const ProductCard = ({
    data,
    addToCart,
    addToCartBuyOneProduct,
    getTotalSessionCart
}) => {
    const navigate = useNavigate();
    const toastId = useRef(null);

    const handleAddToCart = async (e, id) => {
        let response = await addToCart(data.id, [], 1, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        } else {
            document
                .getElementById("add-to-cart-button-" + id)
                .classList.add("clicked");
        }

        response = await getTotalSessionCart();
        if (response && response.type)
            if (response.type == "REDIRECT") navigate(response.to);
    };

    const handleBuy = async () => {
        const response = await addToCartBuyOneProduct(
            data.id,
            [],
            [],
            1,
            data.price
        );
        if (response && response.type)
            if (response.type == "REDIRECT") navigate(response.to);
        navigate("/cart/" + data.slug);
    };

    return (
        <div className="product-card">
            {!data.active && <div className="modal-unavailable-Product"></div>}

            <div className="img-div">
                <Carousel
                    onClickItem={() =>
                        (window.location.href = "/products/" + data.slug)
                    }
                    className="img-carousel"
                    showArrows={true}
                    autoplay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    emulateTouch={true}
                >
                    {data.photos &&
                        JSON.parse(data.photos).map(photo => (
                            <div className="img-parent">
                                <img src={photo.url}></img>
                            </div>
                        ))}
                </Carousel>
            </div>
            <div className="content">
                <h4
                    onClick={() =>
                        (window.location.href = "/products/" + data.slug)
                    }
                >
                    {data.name ? data.name : ""}
                </h4>
                <hr />
                <div className="extras-div">
                    <div className="title">
                        <BsFillPlusCircleFill className="plus-icon" />
                        <h5>Extras</h5>
                    </div>
                    <ul>
                        {data.extras &&
                            JSON.parse(data.extras).map(extra => (
                                <li>{extra}</li>
                            ))}
                    </ul>
                </div>
                <div className="description-div">
                    {parse(data.description ? data.description : "")}
                </div>
                <div className="price-div">
                    <h3>
                        R$
                        {" " + parseFloat(data.price)
                            ? parseFloat(data.price)
                                  .toFixed(2)
                                  .toString()
                                  .replace(".", ",")
                            : ""}
                    </h3>
                </div>
                <div className="buttons-div">
                    {data.active ? (
                        <>
                            {data.storage && data.storage > 0 ? (
                                <>
                                    <SquareButton onClick={handleBuy}>
                                        Comprar
                                    </SquareButton>
                                    <SquareButton
                                        onClick={e =>
                                            handleAddToCart(e, data.id)
                                        }
                                        id={"add-to-cart-button-" + data.id}
                                        className="add-to-cart-button"
                                    >
                                        <span className="text-add-to-cart">
                                            <IoMdCart className="cart-icon" />
                                            Adicionar ao carrinho
                                        </span>
                                        <span className="added">
                                            Adicionado
                                        </span>
                                        <IoMdCart className="cart-added-icon" />
                                        <IoMdSquare className="square-added-icon" />
                                    </SquareButton>
                                </>
                            ) : (
                                <button className="zero-storage-button">
                                    Produto esgotado
                                </button>
                            )}
                        </>
                    ) : (
                        <h4 className="unavailable-product">
                            Produto indisponível
                        </h4>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
