import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Title = ({ value, param }) => {
    if (param) var { [param]: value2 } = useParams();

    useEffect(() => {
        document.title = value2 ? value + value2 : value;
    }, [value]);

    return <></>;
};

export default Title;
