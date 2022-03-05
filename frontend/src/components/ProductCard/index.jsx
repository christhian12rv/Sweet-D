import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import parse from "html-react-parser";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CartActions from "../../store/actions/cart";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";

import SquareButton from "../Buttons/SquareButton";

import "./index.scss";

const ProductCard = ({ data, addToCart }) => {
    const navigate = useNavigate();
    const toastId = useRef(null);

    const handleAddToCart = async () => {
        const response = await addToCart(data.id, [], 1, toastId);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    return (
        <div className="product-card">
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
                    {data.storage && data.storage > 0 ? (
                        <>
                            <SquareButton>Comprar</SquareButton>
                            <SquareButton onClick={handleAddToCart}>
                                <IoMdCart className="cart-icon" />
                                Adicionar ao carrinho
                            </SquareButton>
                        </>
                    ) : (
                        <button className="zero-storage-button">
                            Produto esgotado
                        </button>
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
