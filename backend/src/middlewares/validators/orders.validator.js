const { body } = require("express-validator");
const axios = require("axios");

const ProductModel = require("../../models/Product.model");
const OrderModel = require("../../models/Order.model");
const AddressModel = require("../../models/Address.model");

const statesObj = {
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins"
};

exports.create = [
    body("products.*.id")
        .notEmpty()
        .withMessage("Produto inválido")
        .bail()
        .isInt()
        .withMessage("Produto inválido")
        .custom(value => {
            return ProductModel.findByPk(value)
                .catch(error => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (!product) return Promise.reject("Produto inválido");
                });
        }),

    body("products.*.extras")
        .customSanitizer(value => {
            if (typeof value !== "object") return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Extra é inválido"),

    body("products.*")
        .notEmpty()
        .withMessage("Produto inválido")
        .bail()
        .isObject()
        .withMessage("Produto inválido")
        .custom(value => {
            return ProductModel.findByPk(value.id)
                .catch(error => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (product) {
                        const extrasFindArray = JSON.parse(product.extras);
                        let invalidExtra = false;
                        let invalidExtraValue = "";
                        value.extras.forEach(e => {
                            if (!extrasFindArray.includes(e)) {
                                invalidExtra = true;
                                invalidExtraValue = e;
                            }
                        });
                        if (invalidExtra)
                            return Promise.reject(
                                "Extra " + invalidExtraValue + " inválido"
                            );

                        if (value.quantity > product.storage)
                            return Promise.reject(
                                "Quantidade inválida, maior que estoque"
                            );

                        if (!product.active)
                            return Promise.reject("Produto indisponível");
                    }
                });
        }),

    body("products.*.extras.*")
        .notEmpty()
        .withMessage("Quantidade inválida")
        .isString()
        .withMessage("Extra inválido"),

    body("products.*.quantity")
        .notEmpty()
        .withMessage("Quantidade inválida")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Quantidade inválida")
];

exports.updateFinish = [
    body("id")
        .notEmpty()
        .withMessage("Pedido inválido")
        .bail()
        .isInt()
        .withMessage("Pedido inválido")
        .custom(value => {
            return OrderModel.findByPk(value)
                .catch(error => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(order => {
                    if (!order) return Promise.reject("Pedido inválido");

                    if (order.finished)
                        return Promise.reject("Pedido já finalizado");
                });
        })
];
