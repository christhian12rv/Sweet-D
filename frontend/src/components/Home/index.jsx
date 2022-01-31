import React from "react";

import Header from "./Header";
import FirstBanner from "./FirstBanner";
import ProductsCardContent from "../ProductsCardContent";

const Home = () => {
    return (
        <div className="home-div">
            <Header />
            <FirstBanner />
            <ProductsCardContent />
        </div>
    );
};

export default Home;
