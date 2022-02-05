import React from "react";

import ProductCard from "../ProductCard";

import "./index.scss";

const ProductsCardContent = ({ className }) => {
    let cards = ["", "", "", "", "", "", "", "", ""];

    let actualPage, countPages;

    return (
        <div className={"product-card-content " + className}>
            {cards.map(card => (
                <ProductCard />
            ))}
        </div>
    );
};

export default ProductsCardContent;
