const { body, query } = require("express-validator");
const { Op } = require('sequelize');

const { ProductModel } = require("../../models");
const { ProductIngredientType } = require('../../models');

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
        .isLength({ min: 10 })
        .withMessage("O campo Descrição deve conter no mínimo 10 caracteres"),

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
        .isSlug()
        .withMessage(
            "O Slug informado é inválido. Um Slug não pode conter nenhum caractere especial, exceto hífens"
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

    body("sizes")
        .notEmpty()
        .withMessage("Tamanho é obrigatório")
        .customSanitizer(value => {
            if (!!value && typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .bail()
        .isArray()
        .withMessage("Os tamanhos são inválidos")
        .bail()
        .isLength({ min: 1, })
        .withMessage("É obrigatório pelo menos 1 tamanho")
        .bail()
        .custom(value => {
            value.forEach(v => {
                const keys = Object.keys(v);
                if (!keys.includes('id') && !keys.includes('name') && !keys.includes('price')) {
                    throw new Error("Os tamanhos são inválidos");
                }
            });
            
            return true;
        }),

    body("sizes.*.name")
        .trim()
        .exists()
        .withMessage("Nome de tamanho é obrigatório")
        .bail()
        .notEmpty()
        .withMessage("Nome de tamanho é obrigatório")
        .bail()
        .isString()
        .withMessage("Nome de tamanho inválido"),

    body("sizes.*.price")
        .trim()
        .notEmpty()
        .withMessage("Preço de tamanho é obrigatório")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("Preço de tamanho inválido")
        .toFloat(),

    body("ingredientTypes")
        .notEmpty()
        .withMessage("Tipo de ingrediente é obrigatório")
        .customSanitizer(value => {
            if (!!value && typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Tipo de ingrediente é inválido")
        .bail()
        .isLength({ min: 1, })
        .withMessage("É obrigatório pelo menos 1 tipo de ingrediente")
        .bail()
        .custom(value => {
            value.forEach(v => {
                if (value.filter(ingredientType => ingredientType.type === v.type).length >= 2)
                    throw new Error('Não podem existir tipos de ingredientes com mesmo nome');

                const keys = Object.keys(v);
                if (!keys.includes('id') && !keys.includes('min') && !keys.includes('max') && !keys.includes('type')) {
                    throw new Error("Os tipos de ingredientes são inválidos");
                }

                if (v.min > v.max)
                    throw new Error("Os mínimo não pode ser maior que o máximo");
            });
            
            return true;
        }),

    body("ingredientTypes.*.min")
        .trim()
        .notEmpty()
        .withMessage("Mínimo de tipo de ingrediente é obrigatório")
        .bail()
        .isInt({ min: 1, })
        .withMessage("Mínimo de tipo de ingrediente deve ser maior que 0"),

    body("ingredientTypes.*.max")
        .trim()
        .notEmpty()
        .withMessage("Máximo de tipo de ingrediente é obrigatório")
        .bail()
        .isInt({ min: 1, })
        .withMessage("Máximo de tipo de ingrediente deve ser maior que 0"),

    body("ingredientTypes.*.type")
        .trim()
        .notEmpty()
        .withMessage("Nome tipo de ingrediente é obrigatório")
        .bail()
        .isString()
        .withMessage("Nome tipo de ingrediente inválido")
        .bail(),

    body("ingredients")
        .notEmpty()
        .withMessage("Ingrediente é obrigatório")
        .customSanitizer(value => {
            if (!!value &&  typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Ingredientes é inválido")
        .bail()
        .isLength({ min: 1, })
        .withMessage("É obrigatório pelo menos 1 ingrediente")
        .bail()
        .custom((value, { req }) => {
            req.body.ingredientTypes.forEach(ingredientType => {
                if (value.filter(v => v.type === ingredientType.type ).length < ingredientType.min)
                    throw new Error(`Quantidade de ingredientes do tipo ${ingredientType.type} é insuficiente. Mínimo: ${ingredientType.min}`);
            })

            value.forEach(v => {
                const entries = Object.keys(v);
                if (!entries.includes('id') && !entries.includes('name') && !entries.includes('price') && !entries.includes('type')) {
                    throw new Error("Os ingredientes são inválidos");
                }
            });

            return true;
        }),

    body("ingredients.*.name")
        .trim()
        .notEmpty()
        .withMessage("Nome de ingrediente é obrigatório")
        .bail()
        .isString()
        .withMessage("Nome de ingrediente inválido"),

    body("ingredients.*.price")
        .trim()
        .notEmpty()
        .withMessage("Preço de ingrediente é obrigatório")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("Preço de ingrediente inválido")
        .toFloat(),

    body("ingredients.*.type")
        .trim()
        .notEmpty()
        .withMessage("Tipo de ingrediente é obrigatório")
        .custom((value, { req }) => {
            if (req.body.ingredientTypes.every(ingredientType => ingredientType.type !== value))
                throw new Error(`Não existe um tipo com nome ${value}`);
            

            return true;
        })
];

exports.findAllByIds = [
    query("ids")
        .notEmpty()
        .withMessage("A query ids é obrigatório")
        .customSanitizer(value => value.split(','))
]

exports.update = [
    body("id")
        .notEmpty()
        .withMessage("O campo Id é obrigatório")
        .bail()
        .custom((value, { req }) => {
            return ProductModel.findOne({ where: { id: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(product => {
                    if (!product)
                        return Promise.reject(
                            "Não existe um Produto com o id informado"
                        );
                });
        }),

    body("active")
        .trim()
        .toBoolean()
        .notEmpty()
        .withMessage("Ativo é obrigatório")
        .isBoolean()
        .withMessage("Ativo é inválido"),

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
        .isLength({ min: 10 })
        .withMessage("O campo Descrição deve conter no mínimo 10 caracteres"),

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
        .isSlug()
        .withMessage(
            "O Slug informado é inválido. Um Slug não pode conter nenhum caractere especial, exceto hífens"
        )
        .custom((value, { req }) => {
            return ProductModel.findOne({ where: {
                [Op.and]: [
                    { slug: value },
                    { [Op.not]: { id: req.body.id } }
                ]
            } })
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

    body("sizes")
        .notEmpty()
        .withMessage("Tamanho é obrigatório")
        .customSanitizer(value => {
            if (!!value && typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .bail()
        .isArray()
        .withMessage("Os tamanhos são inválidos")
        .bail()
        .isLength({ min: 1, })
        .withMessage("É obrigatório pelo menos 1 tamanho")
        .bail()
        .custom(value => {
            value.forEach(v => {
                const keys = Object.keys(v);
                if (!keys.includes('id') && !keys.includes('name') && !keys.includes('price')) {
                    throw new Error("Os tamanhos são inválidos");
                }
            });
            
            return true;
        }),

    body("sizes.*.name")
        .trim()
        .exists()
        .withMessage("Nome de tamanho é obrigatório")
        .bail()
        .notEmpty()
        .withMessage("Nome de tamanho é obrigatório")
        .bail()
        .isString()
        .withMessage("Nome de tamanho inválido"),

    body("sizes.*.price")
        .trim()
        .notEmpty()
        .withMessage("Preço de tamanho é obrigatório")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("Preço de tamanho inválido")
        .toFloat(),

    body("ingredientTypes")
        .notEmpty()
        .withMessage("Tipo de ingrediente é obrigatório")
        .customSanitizer(value => {
            if (!!value && typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Tipo de ingrediente é inválido")
        .bail()
        .isLength({ min: 1, })
        .withMessage("É obrigatório pelo menos 1 tipo de ingrediente")
        .bail()
        .custom(value => {
            value.forEach(v => {
                if (value.filter(ingredientType => ingredientType.type === v.type).length >= 2)
                    throw new Error('Não podem existir tipos de ingredientes com mesmo nome');

                const keys = Object.keys(v);
                if (!keys.includes('id') && !keys.includes('min') && !keys.includes('max') && !keys.includes('type')) {
                    throw new Error("Os tipos de ingredientes são inválidos");
                }

                if (v.min > v.max)
                    throw new Error("Os mínimo não pode ser maior que o máximo");
            });
            
            return true;
        }),

    body("ingredientTypes.*.min")
        .trim()
        .notEmpty()
        .withMessage("Mínimo de tipo de ingrediente é obrigatório")
        .bail()
        .isInt({ min: 1, })
        .withMessage("Mínimo de tipo de ingrediente deve ser maior que 0"),

    body("ingredientTypes.*.max")
        .trim()
        .notEmpty()
        .withMessage("Máximo de tipo de ingrediente é obrigatório")
        .bail()
        .isInt({ min: 1, })
        .withMessage("Máximo de tipo de ingrediente deve ser maior que 0"),

    body("ingredientTypes.*.type")
        .trim()
        .notEmpty()
        .withMessage("Nome tipo de ingrediente é obrigatório")
        .bail()
        .isString()
        .withMessage("Nome tipo de ingrediente inválido")
        .bail(),

    body("ingredients")
        .notEmpty()
        .withMessage("Ingrediente é obrigatório")
        .customSanitizer(value => {
            if (!!value &&  typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Ingredientes é inválido")
        .bail()
        .isLength({ min: 1, })
        .withMessage("É obrigatório pelo menos 1 ingrediente")
        .bail()
        .custom((value, { req }) => {
            req.body.ingredientTypes.forEach(ingredientType => {
                if (value.filter(v => v.type === ingredientType.type ).length < ingredientType.min)
                    throw new Error(`Quantidade de ingredientes do tipo ${ingredientType.type} é insuficiente. Mínimo: ${ingredientType.min}`);
            })

            value.forEach(v => {
                const entries = Object.keys(v);
                if (!entries.includes('id') && !entries.includes('name') && !entries.includes('price') && !entries.includes('type')) {
                    throw new Error("Os ingredientes são inválidos");
                }
            });

            return true;
        }),

    body("ingredients.*.name")
        .trim()
        .notEmpty()
        .withMessage("Nome de ingrediente é obrigatório")
        .bail()
        .isString()
        .withMessage("Nome de ingrediente inválido"),

    body("ingredients.*.price")
        .trim()
        .notEmpty()
        .withMessage("Preço de ingrediente é obrigatório")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("Preço de ingrediente inválido")
        .toFloat(),

    body("ingredients.*.type")
        .trim()
        .notEmpty()
        .withMessage("Tipo de ingrediente é obrigatório")
        .custom((value, { req }) => {
            if (req.body.ingredientTypes.every(ingredientType => ingredientType.type !== value))
                throw new Error(`Não existe um tipo com nome ${value}`);
            

            return true;
        })
];