const { body } = require("express-validator");

const ProductModel = require("../../models/Product.model");

exports.create = [
    body("name")
        .trim()
        .customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1);
        })
        .notEmpty()
        .withMessage("O campo Nome é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Nome deve conter no mínimo 2 caracteres"),

    body("slug")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("O campo Slug é obrigatório")
        .bail()
        .isString()
        .withMessage("O Slug informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O Slug deve conter no mínimo 2 caracteres")
        .bail()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage(
            "O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens"
        )
        .custom((value, { req }) => {
            return ProductModel.findOne({ where: { slug: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (product)
                        return Promise.reject(
                            "Já existe um Produto com o slug informado"
                        );
                });
        }),

    body("price")
        .trim()
        .customSanitizer(value => {
            let newValue = value.replace(",", ".");
            newValue = Number(parseFloat(newValue)).toFixed(2);
            return newValue;
        })
        .notEmpty()
        .withMessage("O campo Preço é obrigatório")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("O Preço informado é inválido"),

    body("storage")
        .trim()
        .notEmpty()
        .withMessage("O campo Estoque é obrigatório")
        .bail()
        .isInt()
        .withMessage("O Estoque informado é inválido"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("O campo Descrição é obrigatório")
        .bail()
        .isString()
        .withMessage("O Descrição informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Descrição deve conter no mínimo 2 caracteres"),

    body("extras")
        .optional()
        .customSanitizer(value => {
            if (typeof value !== "object") return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Extra é inválido"),

    body("extras.*")
        .trim()
        .notEmpty()
        .withMessage("Extra inválido")
        .isString()
        .withMessage("Extra inválido"),

    body("priceExtras")
        .optional()
        .customSanitizer(value => {
            if (typeof value !== "object") {
                value = JSON.parse(value);
            }

            value = value.map(v => {
                let newV = v.replace(",", ".");
                newV = Number(parseFloat(newV)).toFixed(2);
                return newV;
            });

            return value;
        })
        .isArray()
        .withMessage("O campo Preço do Extra é inválido")
        .bail()
        .custom((value, { req }) => {
            console.log(value);
            if (value.length != req.body.extras.length)
                throw new Error("Quantidade de preços dos extras inválidos");

            return true;
        }),

    body("priceExtras.*")
        .trim()
        .notEmpty()
        .withMessage("Preço do extra inválido")
        .isString()
        .withMessage("Preço do extra inválido")
];

exports.update = [
    body("name")
        .trim()
        .customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1);
        })
        .notEmpty()
        .withMessage("O campo Nome é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Nome deve conter no mínimo 2 caracteres"),

    body("slug")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("O campo Slug é obrigatório")
        .bail()
        .isString()
        .withMessage("O Slug informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O Slug deve conter no mínimo 2 caracteres")
        .bail()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage(
            "O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens"
        )
        .custom((value, { req }) => {
            return ProductModel.findOne({ where: { slug: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (product && product.slug != value)
                        return Promise.reject(
                            "Já existe um Produto com o slug informado"
                        );
                });
        }),

    body("price")
        .trim()
        .customSanitizer(value => {
            let newValue = value.replace(",", ".");
            newValue = Number(parseFloat(newValue)).toFixed(2);
            return newValue;
        })
        .notEmpty()
        .withMessage("O campo Preço é obrigatório")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("O Preço informado é inválido"),

    body("storage")
        .trim()
        .notEmpty()
        .withMessage("O campo Estoque é obrigatório")
        .bail()
        .isInt()
        .withMessage("O Estoque informado é inválido"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("O campo Descrição é obrigatório")
        .bail()
        .isString()
        .withMessage("O Descrição informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Descrição deve conter no mínimo 2 caracteres"),

    body("extras")
        .optional()
        .customSanitizer(value => {
            if (typeof value !== "object") return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Extra é inválido"),

    body("extras.*")
        .trim()
        .notEmpty()
        .withMessage("Extra inválido")
        .isString()
        .withMessage("Extra inválido"),

    body("priceExtras")
        .optional()
        .customSanitizer(value => {
            if (typeof value !== "object") {
                value = JSON.parse(value);
            }

            value = value.map(v => {
                let newV = v.replace(",", ".");
                newV = Number(parseFloat(newV)).toFixed(2);
                return newV;
            });

            return value;
        })
        .isArray()
        .withMessage("O campo Preço do Extra é inválido")
        .bail()
        .custom((value, { req }) => {
            if (value.length != req.body.extras.length)
                throw new Error("Quantidade de preços dos extras inválidos");

            return true;
        }),

    body("priceExtras.*")
        .trim()
        .notEmpty()
        .withMessage("Preço do extra inválido")
        .isString()
        .withMessage("Preço do extra inválido")
];

exports.updateActive = [
    body("active")
        .trim()
        .toBoolean()
        .notEmpty()
        .withMessage("Valor obrigatório")
        .isBoolean()
        .withMessage("Valor inválido")
];
