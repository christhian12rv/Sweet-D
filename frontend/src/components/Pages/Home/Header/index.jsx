import React from "react";

import TextDiv from "./TextDiv";
import RoundedButton from "../../../Buttons/RoundedButton";

import "./index.scss";

const Header = () => {
    return (
        <div className="header">
            <TextDiv />
            <div className="button-div">
                <RoundedButton
                    onClick={() => (window.location.href = "/products")}
                >
                    Ver produtos
                </RoundedButton>
            </div>
        </div>
    );
};

export default Header;
