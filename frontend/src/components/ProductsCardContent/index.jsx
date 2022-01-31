import React from "react";

import ProductCard from "../ProductCard";

import "./index.scss";

const ProductsCardContent = () => {
    let cards = ["", "", "", "", "", ""];

    return (
        <div className="product-card-content">
            {cards.map(card => (
                <ProductCard />
            ))}
        </div>
    );
};

export default ProductsCardContent;
