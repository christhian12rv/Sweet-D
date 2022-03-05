import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Select from "react-select";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import parse from "html-react-parser";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productsActions from "../../../store/actions/product";

import "./index.scss";

import SquareButton from "../../Buttons/SquareButton";
import ProductCard from "../../ProductCard";
import ProductsCardContent from "../../ProductsCardContent";

const Product = ({ product, products, getProductBySlug, getProducts }) => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const selectOptions = [];

    useEffect(async () => {
        let response = await getProducts(3, 1, "id", "asc", "", undefined);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }

        response = await getProductBySlug(slug);
        console.log(response);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    if (product && product.extras)
        JSON.parse(product.extras).forEach(extra => {
            selectOptions.push({ value: extra, label: extra });
        });

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
                        selectedItem={1}
                    >
                        {product.photos &&
                            JSON.parse(product.photos).map(photo => (
                                <div className="img-parent">
                                    <img src={photo.url}></img>
                                </div>
                            ))}
                    </Carousel>
                </div>
                <div className="product-details">
                    <h3 className="title">{product.name}</h3>
                    <p className="product-id">#{product.id}</p>
                    <div className="price">
                        <h4>R$ </h4>
                        <h3>
                            {product.price
                                .toFixed(2)
                                .toString()
                                .replace(".", ",")}
                        </h3>
                    </div>
                    <div className="description">
                        {parse(product.description)}
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
                        <h4>
                            {product.storage > 1 ? (
                                product.storage <= 10 ? (
                                    <span className="mid-storage">
                                        {product.storage + " "}disponíveis
                                    </span>
                                ) : (
                                    "Em estoque"
                                )
                            ) : (
                                <span className="zero-storage">
                                    Produto esgotado
                                </span>
                            )}
                        </h4>
                    </div>
                    <div className="product-buttons">
                        <SquareButton>Adicionar ao Carrinho</SquareButton>
                        <SquareButton>Comprar</SquareButton>
                    </div>
                </div>
            </div>
            <div className="related-products-container">
                <h3 className="related-products-container-title">
                    Outros Produtos
                </h3>
                <hr className="related-products-container-hr" />
                <div className="products-container">
                    <ProductsCardContent data={products} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    product: state.product.product,
    products: state.product.products
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(productsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Product);
