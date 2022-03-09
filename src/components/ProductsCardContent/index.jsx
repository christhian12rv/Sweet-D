import React from "react";

import ProductCard from "../ProductCard";

import "./index.scss";

const ProductsCardContent = ({ children, data, className }) => {
    return (
        <div className={"product-card-content " + className}>
            {children && children}
            {data.map(d => (
                <ProductCard key={d.id} data={d} />
            ))}
        </div>
    );
};

export default ProductsCardContent;
