import React, { useEffect } from "react";

import Header from "./Header";
import FirstBanner from "./FirstBanner";
import ProductsCardContent from "../../ProductsCardContent";

import "./index.scss";

const Home = () => {
    useEffect(() => {
        document.getElementById("navbar").classList.add("home");
    }, []);

    return (
        <div className="home-div">
            <Header />
            <FirstBanner />
            <ProductsCardContent
                data={["", "", ""]}
                className="products-card-content-home"
            />
        </div>
    );
};

export default Home;
