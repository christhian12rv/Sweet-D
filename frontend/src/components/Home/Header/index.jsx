import React from "react";

import Navbar from "./Navbar";
import TextDiv from "./TextDiv";

import "./index.scss";

const Header = () => {
    return (
        <div className="header">
            <Navbar />
            <TextDiv />
        </div>
    );
};

export default Header;
