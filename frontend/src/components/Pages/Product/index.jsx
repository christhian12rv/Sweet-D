import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Select from "react-select";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";

import "./index.scss";

import SquareButton from "../../Buttons/SquareButton";
import ProductCard from "../../ProductCard";

import DonutImg from "../../../img/donut-example.jpg";
import DonutImg2 from "../../../img/donut-example2.jpg";
import DonutImg3 from "../../../img/donut-example3.jpg";

const Product = () => {
    const selectOptions = [
        { value: "canela", label: "Canela" },
        { value: "calda-de-chocolate", label: "Calda de Chocolate" },
        { value: "chocolate-granulado", label: "Chocolate Granulado" }
    ];

    let cards = ["", "", "", "", "", ""];

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-images-box">
                    <Carousel
                        className="img-carousel"
                        showArrows={false}
                        autoplay={false}
                        infiniteLoop={true}
                        showStatus={false}
                        emulateTouch={false}
                        showIndicators={false}
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
                        <div className="img-parent">
                            <img src={DonutImg3}></img>
                        </div>
                        <div className="img-parent">
                            <img src={DonutImg3}></img>
                        </div>
                        <div className="img-parent">
                            <img src={DonutImg3}></img>
                        </div>
                    </Carousel>
                </div>
                <div className="product-details">
                    <h3 className="title">Donut Doce</h3>
                    <p className="product-id">#12345678</p>
                    <div className="price">
                        <h4>R$ </h4>
                        <h3>20,99</h3>
                    </div>
                    <div className="description">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Rem sunt possimus similique nihil officiis
                            consequuntur quam omnis nemo aspernatur unde
                            corporis totam, iste hic voluptates voluptate. In
                            nobis omnis non!
                        </p>
                    </div>
                    <div className="extras">
                        <h4>Extras</h4>
                        <Select
                            className="extras-select"
                            closeMenuOnSelect={false}
                            isMulti
                            options={selectOptions}
                            placeholder="Selecione algum extra"
                        />
                    </div>
                    <div className="quantity">
                        <h4>Quantidade</h4>
                        <HiMinusCircle className="icon" />
                        <h3>2</h3>
                        <HiPlusCircle className="icon" />
                    </div>
                    <div className="storage">
                        <h4>Em estoque</h4>
                    </div>
                    <div className="product-buttons">
                        <SquareButton>Adicionar ao Carrinho</SquareButton>
                        <SquareButton>Comprar</SquareButton>
                    </div>
                </div>
            </div>
            <div className="related-products-container">
                <h3 className="related-products-container-title">
                    Produtos Relacionados
                </h3>
                <hr className="related-products-container-hr" />
                <div className="products-container">
                    {cards.map(card => (
                        <ProductCard />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
