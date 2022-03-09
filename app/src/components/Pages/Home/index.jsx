import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wave from "react-wavify";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ListProductsActions from "../../../store/actions/listProducts";

import Header from "./Header";
import FirstBanner from "./FirstBanner";
import ProductsCardContent from "../../ProductsCardContent";
import SquareButton from "../../Buttons/SquareButton";

import "./index.scss";

const Home = ({ products, getProducts }) => {
    const navigate = useNavigate();

    useEffect(async () => {
        document.body.classList.add("bg-home");
        document.getElementById("navbar").classList.add("home");

        const response = await getProducts(
            6,
            1,
            "createdAt",
            "desc",
            "",
            undefined
        );

        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    return (
        <div className="home-div">
            <Header />
            <FirstBanner />
            <div className="products-mid-content-box">
                <div className="view-our-products">
                    <h1>Veja alguns de nossos produtos</h1>
                </div>

                <Wave
                    className="wave"
                    fill="#ffcfbd"
                    paused={false}
                    options={{
                        height: 20,
                        amplitude: 20,
                        speed: 0.25,
                        points: 8
                    }}
                />

                {products.length && (
                    <ProductsCardContent
                        data={products}
                        className="products-card-content-home"
                    ></ProductsCardContent>
                )}

                <SquareButton
                    className="view-more-products"
                    onClick={() => (window.location.href = "/products")}
                >
                    Ver mais produtos
                </SquareButton>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    products: state.listProducts.products
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(ListProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
