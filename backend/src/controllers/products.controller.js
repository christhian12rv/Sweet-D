const { validationResult } = require("express-validator");

const productsService = require("../services/products.service");

exports.findByPk = async (req, res) => {
    try {
        let { id } = req.params;

        const product = await productsService.findByPk(id);

        if (!product)
            return res.json({
                status: 400,
                errors: [{ msg: "Produto inválido" }]
            });

        res.json({ status: 200, product });
    } catch (error) {
        res.json({ status: 500, msg: "Houve um erro interno" });
    }
};

exports.findAll = async (req, res) => {
    try {
        let { limit, page, columnSort, directionSort, search } = req.query;
        columnSort =
            columnSort == "undefined" || columnSort == "null"
                ? undefined
                : columnSort;
        directionSort =
            directionSort == "undefined" || directionSort == "null"
                ? undefined
                : directionSort;
        const { totalRows, products } = await productsService.findAll(
            parseInt(limit),
            parseInt(page),
            columnSort,
            directionSort,
            search
        );
        res.json({ status: 200, totalRows, products });
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
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar criar produto"
        });
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    if (
        (!req.files || Object.keys(req.files).length === 0) &&
        (!req.body.bodyPhotos || !req.body.bodyPhotos.length)
    ) {
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
        const { id } = req.body;
        const productExists = productsService.findByPk(id);
        if (!productExists)
            return res.json({
                status: 400,
                errors: [{ msg: "Produto inválido" }]
            });

        if (typeof req.body.bodyPhotos != "object")
            req.body.bodyPhotos = [req.body.bodyPhotos];

        const bodyPhotos = [];
        if (req.body.bodyPhotos) {
            req.body.bodyPhotos.forEach(b => {
                if (b) bodyPhotos.push(JSON.parse(b));
            });
        }
        const { name, description, price, storage, slug, extras } = req.body;
        const product = await productsService.update(
            id,
            name,
            description,
            price,
            storage,
            slug,
            extras,
            bodyPhotos,
            req.files && req.files.photos ? req.files.photos : []
        );
        res.json({
            status: 200,
            product,
            msg: "Produto alterado com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar alterar produto"
        });
    }
};

exports.updateActive = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { id, active } = req.body;

        const product = await productsService.updateActive(id, active);
        res.json({
            status: 200,
            product,
            msg:
                "Produto " + (active ? "ativado" : "desativado") + "com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar ativar ou desativar produto"
        });
    }
};
