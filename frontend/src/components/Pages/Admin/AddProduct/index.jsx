import React from "react";
import CurrencyInput from "react-currency-input-field";

import InputText from "../../../InputText";
import InputNumber from "../../../InputNumber";

import "./index.scss";

const AddProduct = () => {
    return (
        <div className="admin-add-product">
            <div className="item name">
                <h5>Nome</h5>
                <InputText placeholder="Nome" />
            </div>
            <div className="item slug">
                <h5>Slug</h5>
                <InputText placeholder="Slug" />
            </div>
            <div className="item price">
                <h5>Preço</h5>
                <CurrencyInput
                    className="currency-input"
                    prefix="R$ "
                    decimalSeparator=","
                    groupSeparator="."
                    allowNegativeValue={false}
                    placeholder="R$"
                />
            </div>
            <div className="item storage">
                <h5>Estoque</h5>
                <CurrencyInput
                    className="currency-input"
                    allowNegativeValue={false}
                    disableGroupSeparators={true}
                    placeholder="Estoque"
                />
            </div>
        </div>
    );
};

export default AddProduct;
