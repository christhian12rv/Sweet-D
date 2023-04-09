const { body } = require("express-validator");
const { ProductModel, ProductSizeModel, ProductIngredientTypeModel, ProductIngredientModel } = require("../../models");
const { OrderModel } = require("../../models");

exports.create = [
    body("productsChoices.*.id")
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
                if (!product)
                    return Promise.reject("Produto inválido");
            });
    }),

    body("productsChoices.*.quantity")
        .notEmpty()
        .withMessage("Quantidade inválida")
        .bail()
        .isInt({ min: 1, })
        .withMessage("Quantidade inválida"),

    body("productsChoices.*.size")
        .notEmpty()
        .withMessage("Tamanho inválido")
        .bail()
        .isInt()
        .withMessage("Tamanho inválido"),

    body("productsChoices.*.ingredients.*.type")
        .notEmpty()
        .withMessage("Tipo de ingrediente inválido")
        .bail()
        .isString()
        .withMessage("Tipo de ingrediente inválido"),

    body("productsChoices.*.ingredients.*.ingredients.*")
        .notEmpty()
        .withMessage("Ingrediente inválido")
        .bail()
        .isInt()
        .withMessage("Ingrediente inválido"),

    body("productsChoices.*")
        .notEmpty()
        .withMessage("Pedido inválido")
        .bail()
        .custom(value => {
            return ProductSizeModel.findOne({
                where: {
                    id: Number(value.size),
                    productId: Number(value.id),
                }
            })
            .catch(error => {
                return Promise.reject("Ocorreu um erro interno");
            })
            .then(size => {
                if (!size)
                    return Promise.reject("Tamanho inválido");
            });
        })
        .custom(async (value) => {
            for (let i = 0; i < value.ingredients.length; i++) {
                const productIngredientType = await ProductIngredientTypeModel.findOne({
                    where: {
                        type: value.ingredients[i].type,
                        productId: Number(value.id),
                    }
                });

                if (!productIngredientType)
                    throw new Error('Tipo de ingrediente inválido');

                for (let j = 0; j < value.ingredients[i].ingredients; j++) {
                    const productIngredient = ProductIngredientModel.findOne({
                        where: {
                            id: Number(value.ingredients[i].ingredients[i]),
                            productId: Number(value.id),
                        }
                    })

                    if (!productIngredient)
                    throw new Error('Ingrediente inválido');
                }
            }
        }),
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
