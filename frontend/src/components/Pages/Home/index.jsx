import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ListProductsActions from "../../../store/actions/listProducts";

import Header from "./Header";
import FirstBanner from "./FirstBanner";
import ProductsCardContent from "../../ProductsCardContent";

import "./index.scss";

const Home = ({ products, getProducts }) => {
    const navigate = useNavigate();

    useEffect(async () => {
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
            {products.length && (
                <ProductsCardContent
                    data={products}
                    className="products-card-content-home"
                />
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    products: state.listProducts.products
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(ListProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
