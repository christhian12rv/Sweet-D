import React from "react";

import Navbar from "../../Navbar";
import Footer from "../../Footer";

const Layout = ({ children, activePage }) => {
    return (
        <>
            <Navbar activePage={activePage} />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
