import React from "react";

import ProductCard from "../ProductCard";

import "./index.scss";

const ProductsCardContent = ({ data, className }) => {
    return (
        <div className={"product-card-content " + className}>
            {data.map(d => (
                <ProductCard key={d.id} data={d} />
            ))}
        </div>
    );
};

export default ProductsCardContent;
