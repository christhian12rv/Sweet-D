const { body } = require("express-validator");
const axios = require("axios");

const ProductModel = require("../../models/Product.model");
const OrderModel = require("../../models/Order.model");

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
                        console.log(JSON.parse(product.extras));
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
        .withMessage("Quantidade inválida"),

    body("address.address")
        .trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, " da ")
                .replace(/ De /g, " de ")
                .replace(/ Do /g, " do ")
                .replace(/ Das /g, " das ")
                .replace(/ Dos /g, " dos ");
        })
        .notEmpty()
        .withMessage("O campo Endereço é obrigatório")
        .bail()
        .isString()
        .withMessage("O Endereço informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Endereço deve conter no mínimo 2 caracteres"),

    body("address.number")
        .trim()
        .notEmpty()
        .withMessage("O campo Número é obrigatório"),

    body("address.postalCode")
        .custom((value, { req }) => {
            return true;
        })
        .trim()
        .notEmpty()
        .withMessage("O campo CEP é obrigatório")
        .bail()
        .isString()
        .withMessage("O CEP informado é inválido")
        .bail()
        .isLength({ min: 10, max: 10 })
        .withMessage("O CEP informado é inválido")
        .bail()
        .matches(/[0-9]{2}.[0-9]{3}-[\d]{3}/)
        .withMessage("O CEP informado é inválido")
        .bail()
        .custom((value, { req }) => {
            return axios
                .get(
                    "https://viacep.com.br/ws/" +
                        value.replace("-", "").replace(".", "") +
                        "/json/unicode/"
                )
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(response => {
                    const data = response.data;
                    if ("erro" in data)
                        return Promise.reject("O CEP informado é inválido");
                    else {
                        req.body.address.state = statesObj[data.uf];
                        req.body.address.city = data.localidade;
                    }
                });
        }),

    body("address.city")
        .trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, " da ")
                .replace(/ De /g, " de ")
                .replace(/ Do /g, " do ")
                .replace(/ Das /g, " das ")
                .replace(/ Dos /g, " dos ");
        })
        .notEmpty()
        .withMessage("O campo Cidade é obrigatório")
        .bail()
        .isString()
        .withMessage("A Cidade informada é inválida")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Cidade deve conter no mínimo 2 caracteres"),

    body("address.state")
        .trim()
        .notEmpty()
        .withMessage("O campo Estado é obrigatório")
        .bail()
        .isString()
        .withMessage("O Estado informado é asdfinválido")
        .bail()
        .isIn([
            "Acre",
            "Alagoas",
            "Amapá",
            "Amazonas",
            "Bahia",
            "Ceará",
            "Distrito Federal",
            "Espírito Santo",
            "Goías",
            "Maranhão",
            "Mato Grosso",
            "Mato Grosso do Sul",
            "Minas Gerais",
            "Pará",
            "Paraíba",
            "Paraná",
            "Pernambuco",
            "Piauí",
            "Rio de Janeiro",
            "Rio Grande do Norte",
            "Rio Grande do Sul",
            "Rondônia",
            "Roraíma",
            "Santa Catarina",
            "São Paulo",
            "Sergipe",
            "Tocantins"
        ])
        .withMessage("O Estado informado é inválido"),

    body("address.district")
        .trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, " da ")
                .replace(/ De /g, " de ")
                .replace(/ Do /g, " do ")
                .replace(/ Das /g, " das ")
                .replace(/ Dos /g, " dos ");
        })
        .notEmpty()
        .withMessage("O campo Bairro é obrigatório")
        .bail()
        .isString()
        .withMessage("O Bairro informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Bairro deve conter no mínimo 2 caracteres"),

    body("address.complement")
        .optional()
        .trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, " da ")
                .replace(/ De /g, " de ")
                .replace(/ Do /g, " do ")
                .replace(/ Das /g, " das ")
                .replace(/ Dos /g, " dos ");
        })
        .notEmpty()
        .withMessage("O Complemento informado é inválido"),

    body("address.phone")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O Telefone informado é inválido")
        .bail()
        .isString()
        .withMessage("O Telefone informado é inválido")
        .bail()
        .isLength({ min: 14, max: 15 })
        .withMessage("O Telefone informado é inválido")
        .bail()
        .matches(/\(\d{2,}\) \d{4,}\-\d{4}/)
        .withMessage("O Telefone informado é inválido"),

    body("address.description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("A Descrição informada é inválida")
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
