const { body } = require("express-validator");

const ProductModel = require("../../models/Product/Product.model");
const ProductIngredientType = require('../../models/Product/ProductIngredientType.model');

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
        .isArray()
        .withMessage("O campo Tamanhos é inválido"),

    body("sizes.*.name")
        .trim()
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
        .withMessage("O campo Tamanhos é inválido")
        .bail()
        .custom((value, { req }) => {
            value.forEach(v => {
                if (value.filter(ingredientType => ingredientType.type === v.type).length >= 2)
                    throw new Error('Não podem existir tipos de ingredientes com mesmo nome');
            })
            
            return true;
        }),

    body("ingredientTypes.*.min")
        .trim()
        .notEmpty()
        .withMessage("Mínimo de tipo de ingrediente é obrigatório")
        .bail()
        .isInt({ min: 0, })
        .withMessage("Mínimo de tipo de ingrediente inválido"),

    body("ingredientTypes.*.max")
        .trim()
        .notEmpty()
        .withMessage("Máximo de tipo de ingrediente é obrigatório")
        .bail()
        .isInt({ min: 0, })
        .withMessage("Máximo de tipo de ingrediente inválido"),

    body("ingredientTypes.*.type")
        .trim()
        .notEmpty()
        .withMessage("Máximo de tipo de ingrediente é obrigatório")
        .bail()
        .isString()
        .withMessage("Máximo de tipo de ingrediente inválido")
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
        .custom((value, { req }) => {
            req.body.ingredientTypes.forEach(ingredientType => {
                if (value.filter(v => v.type === ingredientType.type ).length < ingredientType.min)
                    throw new Error(`Quantidade de ingredientes do tipo ${ingredientType.type} é insuficiente. Mínimo: ${ingredientType.min}`);
            })
            

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

    body("name")
        .optional()
        .trim()
        .customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1);
        })
        .notEmpty()
        .withMessage("O campo Nome é inválido")
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
        .withMessage("O campo Descrição é inválido")
        .bail()
        .isString()
        .withMessage("O Descrição informado é inválido")
        .bail()
        .isLength({ min: 10 })
        .withMessage("O campo Descrição deve conter no mínimo 10 caracteres"),

    body("slug")
        .optional()
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("O campo Slug é inválido")
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
        .optional()
        .notEmpty()
        .withMessage("Tamanho é inválido")
        .customSanitizer(value => {
            if (!!value && typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Tamanhos é inválido"),

    body("sizes.*.name")
        .trim()
        .notEmpty()
        .withMessage("Nome de tamanho é inválido")
        .bail()
        .isString()
        .withMessage("Nome de tamanho inválido"),

    body("sizes.*.price")
        .trim()
        .notEmpty()
        .withMessage("Preço de tamanho é inválido")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("Preço de tamanho inválido")
        .toFloat(),

    body("ingredientTypes")
        .optional()
        .notEmpty()
        .withMessage("Tipo de ingrediente é inválido")
        .customSanitizer(value => {
            if (!!value && typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Tamanhos é inválido")
        .bail()
        .custom((value, { req }) => {
            value.forEach(v => {
                if (value.filter(ingredientType => ingredientType.type === v.type).length >= 2)
                    throw new Error('Não podem existir tipos de ingredientes com mesmo nome');
            })
            
            return true;
        }),

    body("ingredientTypes.*.min")
        .trim()
        .notEmpty()
        .withMessage("Mínimo de tipo de ingrediente é inválido")
        .bail()
        .isInt({ min: 0, })
        .withMessage("Mínimo de tipo de ingrediente inválido"),

    body("ingredientTypes.*.max")
        .trim()
        .notEmpty()
        .withMessage("Máximo de tipo de ingrediente é inválido")
        .bail()
        .isInt({ min: 0, })
        .withMessage("Máximo de tipo de ingrediente inválido"),

    body("ingredientTypes.*.type")
        .trim()
        .notEmpty()
        .withMessage("Máximo de tipo de ingrediente é inválido")
        .bail()
        .isString()
        .withMessage("Máximo de tipo de ingrediente inválido")
        .bail(),

    body("ingredients")
        .optional()
        .notEmpty()
        .withMessage("Ingrediente é inválido")
        .customSanitizer(value => {
            if (!!value &&  typeof value !== "object")
                return JSON.parse(value);
            return value;
        })
        .isArray()
        .withMessage("O campo Ingredientes é inválido")
        .custom((value, { req }) => {
            req.body.ingredientTypes.forEach(ingredientType => {
                if (value.filter(v => v.type === ingredientType.type ).length < ingredientType.min)
                    throw new Error(`Quantidade de ingredientes do tipo ${ingredientType.type} é insuficiente. Mínimo: ${ingredientType.min}`);
            })
            

            return true;
        }),

    body("ingredients.*.name")
        .trim()
        .notEmpty()
        .withMessage("Nome de ingrediente é inválido")
        .bail()
        .isString()
        .withMessage("Nome de ingrediente inválido"),

    body("ingredients.*.price")
        .trim()
        .notEmpty()
        .withMessage("Preço de ingrediente é inválido")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("Preço de ingrediente inválido")
        .toFloat(),

    body("ingredients.*.type")
        .trim()
        .notEmpty()
        .withMessage("Tipo de ingrediente é inválido")
        .custom((value, { req }) => {
            if (req.body.ingredientTypes.every(ingredientType => ingredientType.type !== value))
                throw new Error(`Não existe um tipo com nome ${value}`);
            

            return true;
        })
];

exports.updateActive = [
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
        .withMessage("Valor obrigatório")
        .isBoolean()
        .withMessage("Valor inválido")
];
