import React from "react";
import Select from "react-select";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { IoTrashBinSharp } from "react-icons/io5";

import RoundedButton from "../../Buttons/RoundedButton";

import "./index.scss";

import Donut from "../../../img/donut-example.jpg";

const Cart = () => {
    const selectOptions = [
        { value: "canela", label: "Canela" },
        { value: "calda-de-chocolate", label: "Calda de Chocolate" },
        { value: "chocolate-granulado", label: "Chocolate Granulado" }
    ];

    return (
        <div className="cart">
            <div className="products-div">
                <table>
                    <thead>
                        <tr>
                            <th>PRODUTO</th>
                            <th>PREÇO</th>
                            <th>QUANTIDADE</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="product">
                                <img className="product-img" src={Donut}></img>
                                <h4>Donuts doce com canela</h4>
                                <p>
                                    <strong>Estras: </strong>
                                    <Select
                                        className="extras-select"
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={selectOptions}
                                        placeholder="Selecione algum extra"
                                    />
                                </p>
                                <a>
                                    <IoTrashBinSharp className="icon" />
                                    Remover
                                </a>
                            </td>
                            <td>
                                <h3>R$ 24,90</h3>
                            </td>
                            <td className="quantity">
                                <div className="quantity-div">
                                    <HiMinusCircle className="icon" />
                                    <h3>2</h3>
                                    <HiPlusCircle className="icon" />
                                </div>
                            </td>
                            <td>
                                <h3>R$ 49,80</h3>
                            </td>
                        </tr>
                        <tr>
                            <td className="product">
                                <img className="product-img" src={Donut}></img>
                                <h4>Donuts doce com canela</h4>
                                <p>
                                    <strong>Estras: </strong>
                                    <Select
                                        className="extras-select"
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={selectOptions}
                                        placeholder="Selecione algum extra"
                                    />
                                </p>
                                <a>
                                    <IoTrashBinSharp className="icon" />
                                    Remover
                                </a>
                            </td>
                            <td>
                                <h3>R$ 24,90</h3>
                            </td>
                            <td className="quantity">
                                <div className="quantity-div">
                                    <HiMinusCircle className="icon" />
                                    <h3>2</h3>
                                    <HiPlusCircle className="icon" />
                                </div>
                            </td>
                            <td>
                                <h3>R$ 49,80</h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="checkout-div">
                <div className="content">
                    <hr />
                    <h3>
                        <span className="lighter">SUBTOTAL: </span>
                        <span className="price">R$ 99,60</span>
                    </h3>
                    <h3>
                        <span className="lighter">PREÇO TOTAL: </span>
                        <span className="price">R$ 99,60</span>
                    </h3>

                    <RoundedButton>Comprar</RoundedButton>
                </div>
            </div>
        </div>
    );
};

export default Cart;
