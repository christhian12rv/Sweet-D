import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import parse from "html-react-parser";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";

import SquareButton from "../Buttons/SquareButton";

import "./index.scss";

const ProductCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card">
            <div className="img-div">
                <Carousel
                    onClickItem={() => navigate("/product/" + data.slug)}
                    className="img-carousel"
                    showArrows={true}
                    autoplay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    emulateTouch={true}
                >
                    {JSON.parse(data.photos).map(photo => (
                        <div className="img-parent">
                            <img src={photo.url}></img>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="content">
                <h4 onClick={() => navigate("/product/" + data.slug)}>
                    {data.name}
                </h4>
                <hr />
                <div className="extras-div">
                    <div className="title">
                        <BsFillPlusCircleFill className="plus-icon" />
                        <h5>Extras</h5>
                    </div>
                    <ul>
                        {JSON.parse(data.extras).map(extra => (
                            <li>{extra}</li>
                        ))}
                    </ul>
                </div>
                <div className="description-div">{parse(data.description)}</div>
                <div className="price-div">
                    <h3>
                        R$
                        {" " +
                            data.price.toFixed(2).toString().replace(".", ",")}
                    </h3>
                </div>
                <div className="buttons-div">
                    <SquareButton>Comprar</SquareButton>
                    <SquareButton>
                        <IoMdCart className="cart-icon" />
                        Adicionar ao carrinho
                    </SquareButton>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
