const { validationResult } = require("express-validator");

const productsService = require("../services/products.service");

exports.find = async (req, res) => {
    try {
        const products = await productsService.findAll();
        res.json({ products });
    } catch (error) {
        res.json({ status: 500, msg: "Houve um erro interno" });
    }
};

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({
            status: 400,
            errors: [
                {
                    msg: "O produto deve ter pelo menos 1 imagem"
                }
            ]
        });
    }

    try {
        const { name, description, price, storage, slug, extras } = req.body;
        const product = await productsService.create(
            name,
            description,
            price,
            storage,
            slug,
            extras,
            req.files.photos
        );
        res.json({ status: 200, product, msg: "Produto criado com sucesso" });
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar criar produto"
        });
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.body;
        const productExists = productsService.findByPk(id);
        if (!productExists)
            return res.json(400).json({ msg: "Produto inválido" });

        const product = await productsService.update(
            req.body,
            req.files && req.files.photos ? req.files.photos : null
        );
        res.json({ product, msg: "Produto alterado com sucesso" });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar alterar produto"
        });
    }
};
