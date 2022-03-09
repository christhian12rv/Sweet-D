import React from "react";

import Navbar from "../../Navbar";
import Footer from "../../Footer";

const Layout = ({ isBuyOneProduct, children, activePage }) => {
    return (
        <>
            <Navbar
                activePage={activePage}
                isBuyOneProduct={isBuyOneProduct ? true : false}
            />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
