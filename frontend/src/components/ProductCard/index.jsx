import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";

import SquareButton from "../Buttons/SquareButton";

import "./index.scss";

import DonutImg from "../../img/donut-example.jpg";
import DonutImg2 from "../../img/donut-example2.jpg";
import DonutImg3 from "../../img/donut-example3.jpg";

const ProductCard = () => {
    return (
        <div className="product-card">
            <div className="img-div">
                <Carousel
                    className="img-carousel"
                    showArrows={true}
                    autoplay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    emulateTouch={true}
                >
                    <div className="img-parent">
                        <img src={DonutImg}></img>
                    </div>
                    <div className="img-parent">
                        <img src={DonutImg2}></img>
                    </div>
                    <div className="img-parent">
                        <img src={DonutImg3}></img>
                    </div>
                </Carousel>
            </div>
            <div className="content">
                <h4>Donut doce com canela</h4>
                <hr />
                <div className="extras-div">
                    <div className="title">
                        <BsFillPlusCircleFill className="plus-icon" />
                        <h5>Extras</h5>
                    </div>
                    <ul>
                        <li>Canela</li>
                        <li>Calda de Chocolate</li>
                        <li>Chocolate Granulado</li>
                    </ul>
                    <div className="description-div">
                        <p>
                            Não tem melhor coisa do que amanhecer com aquele
                            doce delicioso ao seu lado. Por isso, esse donut
                            doce com canela é a melhor solução para você!
                        </p>
                    </div>
                    <div className="price-div">
                        <h3>R$ 20,00</h3>
                    </div>
                    <div className="buttons-div">
                        <SquareButton>Comprar</SquareButton>
                        <SquareButton>
                            <IoMdCart className="cart-icon" />
                            Adicionar ao carrinho
                        </SquareButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
