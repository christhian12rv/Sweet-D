import React from "react";

import "./index.scss";

const Card = ({
    children,
    title,
    boxIconColor,
    statistics,
    text,
    className
}) => {
    return (
        <div className={"dashboard-card " + (className ? className : "")}>
            <h5 className="title">{title}</h5>
            <div className="row-statistics">
                <div
                    className="box-icon"
                    style={{ backgroundColor: boxIconColor }}
                >
                    {children}
                </div>
                <div className="div">
                    <h4 className="statistics">{statistics}</h4>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
