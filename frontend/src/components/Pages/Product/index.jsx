import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Select from "react-select";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import parse from "html-react-parser";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CartActions from "../../../store/actions/cart";
import * as ProductActions from "../../../store/actions/product";

import "./index.scss";

import SquareButton from "../../Buttons/SquareButton";
import ProductsCardContent from "../../ProductsCardContent";

const Product = ({
    product,
    products,
    getProductBySlug,
    getProducts,
    addToCart,
    extrasInput,
    quantityInput,
    updateInputProduct
}) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const toastId = useRef(null);
    const [isGettingProduct, setIsGettingProduct] = useState(true);

    const selectOptions = [];

    if (!isGettingProduct && product && !product.active) navigate("/error-404");

    useEffect(async () => {
        setIsGettingProduct(true);
        let response = await getProducts(
            3,
            1,
            "random",
            undefined,
            "",
            undefined
        );
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
        setIsGettingProduct(false);
        response = await getProductBySlug(slug);

        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    const handleAddToCart = async () => {
        const newExtras = extrasInput.map(e => e.value);
        const response = await addToCart(
            product.id,
            newExtras,
            quantityInput,
            toastId
        );
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    const handleSelectChange = async value => {
        await updateInputProduct(value, "extras");
    };

    const handleQuantityChange = async func => {
        let newValue = quantityInput;
        if (func == "add") {
            if (newValue < product.storage) newValue += 1;
        } else if (func == "remove") {
            if (newValue > 1) newValue -= 1;
        }
        await updateInputProduct(newValue, "quantity");
    };

    if (product && product.extras)
        JSON.parse(product.extras).forEach((extra, i) => {
            selectOptions.push({
                value: extra,
                label:
                    extra +
                    " (R$ " +
                    parseFloat(JSON.parse(product.priceExtras)[i])
                        .toFixed(2)
                        .toString()
                        .replace(".", ",") +
                    ")"
            });
        });

    return (
        <>
            {!isGettingProduct && product && product.active && (
                <div className="product-page">
                    <div className="product-container">
                        <div className="product-images-box">
                            <Carousel
                                className="img-carousel"
                                showArrows={false}
                                autoplay={false}
                                infiniteLoop={true}
                                showStatus={false}
                                swipeScrollTolerance={20}
                                showIndicators={false}
                            >
                                {product.photos &&
                                    JSON.parse(product.photos).map(
                                        (photo, i) => (
                                            <div key={i} className="img-parent">
                                                <img src={photo.url}></img>
                                            </div>
                                        )
                                    )}
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
                                    value={extrasInput}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div className="quantity">
                                <h4>Quantidade</h4>
                                <HiMinusCircle
                                    className="icon"
                                    onClick={() =>
                                        handleQuantityChange("remove")
                                    }
                                />
                                <h3>{quantityInput}</h3>
                                <HiPlusCircle
                                    className="icon"
                                    onClick={() => handleQuantityChange("add")}
                                />
                            </div>
                            <div className="storage">
                                <h4>
                                    {product.storage > 1 ? (
                                        product.storage <= 10 ? (
                                            <span className="mid-storage">
                                                {product.storage + " "}
                                                disponíveis
                                            </span>
                                        ) : (
                                            "Em estoque"
                                        )
                                    ) : (
                                        ""
                                    )}
                                </h4>
                            </div>
                            <div className="product-buttons">
                                {product.storage && product.storage > 0 ? (
                                    <>
                                        <SquareButton onClick={handleAddToCart}>
                                            Adicionar ao Carrinho
                                        </SquareButton>
                                        <SquareButton>Comprar</SquareButton>
                                    </>
                                ) : (
                                    <button className="zero-storage-button">
                                        Produto esgotado
                                    </button>
                                )}
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
            )}
        </>
    );
};

const mapStateToProps = state => ({
    product: state.product.product,
    products: state.product.products,
    extrasInput: state.product.input.extras,
    quantityInput: state.product.input.quantity
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        Object.assign({}, CartActions, ProductActions),
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Product);
