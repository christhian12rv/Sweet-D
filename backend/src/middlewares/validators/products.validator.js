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

    body("price")
        .trim()
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
        .withMessage("O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens")
        .custom((value, { req }) => {
            return ProductModel.findOne({ where: { slug: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then((product) => {
                    if (product)
                        return Promise.reject("Já existe um Produto com o slug informado");
                })
        })
]

exports.update = [
    body("id")
        .notEmpty()
        .withMessage("Produto inválido")
        .bail()
        .isInt()
        .withMessage("Produto inválido")
        .custom((value, { req }) => {
            return ProductModel.findByPk(value)
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((product) => {
                    if (!product)
                        return Promise.reject("Produto inválido");
                })
        }),

    body("name")
        .optional()
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

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O campo Descrição é obrigatório")
        .bail()
        .isString()
        .withMessage("O Descrição informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Descrição deve conter no mínimo 2 caracteres"),

    body("price")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O campo Preço é obrigatório")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("O Preço informado é inválido"),

    body("storage")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O campo Estoque é obrigatório")
        .bail()
        .isInt()
        .withMessage("O Estoque informado é inválido"),

    body("slug")
        .optional()
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
        .withMessage("O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens")
        .custom((value, { req }) => {
            return ProductModel.findOne({ where: { slug: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then((product) => {
                    if (product)
                        return Promise.reject("Slug igual ao do produto ou já existe outro produto com o slug informado");
                })
        })
]