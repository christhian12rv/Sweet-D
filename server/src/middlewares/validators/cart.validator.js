const { body } = require("express-validator");

const ProductModel = require("../../models/Product/Product.model");
const UserModel = require("../../models/User/User.model");

exports.create = [
    body("product.id")
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

    body("product.extras")
        .customSanitizer(value => {
            if (typeof value !== "object") return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Extra é inválido"),

    body("product")
        .notEmpty()
        .withMessage("Produto inválido")
        .bail()
        .isObject()
        .withMessage("Produto inválido")
        .custom((value, { req }) => {
            return ProductModel.findByPk(value.id)
                .catch(error => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (product) {
                        if (req.session.products) {
                            const productExistsInSession =
                                req.session.products.products.find(
                                    p => p.id == product.id
                                );
                            if (productExistsInSession)
                                return Promise.reject(
                                    "Produto já está no carrinho"
                                );
                        }

                        const extrasFindArray = product.extras;
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

    body("product.extras.*")
        .notEmpty()
        .withMessage("Quantidade inválida")
        .isString()
        .withMessage("Extra inválido"),

    body("product.quantity")
        .notEmpty()
        .withMessage("Quantidade inválida")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Quantidade inválida")
];

exports.update = [
    body("product.id")
        .optional()
        .notEmpty()
        .withMessage("Produto inválido")
        .bail()
        .isInt()
        .withMessage("Produto inválido")
        .custom((value, { req }) => {
            return ProductModel.findByPk(value)
                .catch(error => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (!product) return Promise.reject("Produto inválido");

                    if (req.session.products) {
                        const productExistsInSession =
                            req.session.products.products.find(
                                p => p.id == product.id
                            );
                        if (!productExistsInSession && !req.body.isBuyProduct)
                            return Promise.reject(
                                "Produto não está no carrinho"
                            );
                    }
                });
        }),

    body("product.extras")
        .optional()
        .customSanitizer(value => {
            if (typeof value !== "object") return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Extra é inválido"),

    body("product")
        .optional()
        .notEmpty()
        .withMessage("Produto inválido")
        .bail()
        .isObject()
        .withMessage("Produto inválido")
        .custom((value, { req }) => {
            return ProductModel.findByPk(value.id)
                .catch(error => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (product) {
                        const extrasFindArray = product.extras;
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

    body("product.extras.*")
        .optional()
        .notEmpty()
        .withMessage("Quantidade inválida")
        .isString()
        .withMessage("Extra inválido"),

    body("product.quantity")
        .optional()
        .notEmpty()
        .withMessage("Quantidade inválida")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Quantidade inválida")
];
