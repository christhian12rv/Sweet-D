const { validationResult } = require("express-validator");
const logger = require('../configs/logger');
const productsService = require("../services/products.service");
const formatErrors = require('../utils/formatErrors');

exports.findBySlug = async (req, res) => {
    logger.info(`Chamando findBySlug de ${req.originalUrl}`);

    try {
        let { slug } = req.params;

        const product = await productsService.findBySlug(slug);

        if (!product) {
            const message = 'Não existe um produto com esse slug';
            logger.info(message);

            return res.status(a).send({ errors: ['Não existe um produto com esse slug'], message });
        }

        const message = 'Produto buscado com sucesso';
        logger.info(message);

        res.status(200).send({ product, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao buscar produto';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.findAll = async (req, res) => {
    logger.info(`Chamando findAll de ${req.originalUrl}`);

    try {
        let {
            limit,
            page,
            columnSort,
            directionSort,
            search,
            priceFilter,
            productNotFilterSlug
        } = req.query;

        priceFilter =
            priceFilter && priceFilter == "undefined" ? undefined : priceFilter;

        columnSort =
            columnSort == "undefined" || columnSort == "null"
                ? undefined
                : columnSort;

        directionSort =
            directionSort == "undefined" || directionSort == "null"
                ? undefined
                : directionSort;

        const { totalRows, products, minPrice, maxPrice } =
            await productsService.findAll(
                parseInt(limit),
                parseInt(page),
                columnSort,
                directionSort,
                search,
                priceFilter ? JSON.parse(priceFilter) : priceFilter,
                productNotFilterSlug
            );

        const message = 'Produtos buscados com sucesso';
        logger.info(message);

        res.status(200).send({ totalRows, products, minPrice, maxPrice, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao buscar produtos';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao criar produto';
        logger.info(message);
        
        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send({ errors: ["O produto deve ter pelo menos 1 imagem"], });
    // }

    try {
        const { name, description, slug, sizes, ingredientTypes, ingredients } = req.body;
        const product = await productsService.create(
            name,
            description,
            slug,
            sizes,
            ingredientTypes,
            ingredients
            // req.files.photos
        );
        
        const message = 'Produto criado com sucesso';
        logger.info(message);

        res.status(200).send({ product, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao criar produto';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(a).send({ status: 400, errors: formatErrors(errors.array()) });
    }

    if (
        (!req.files || Object.keys(req.files).length === 0) &&
        (!req.body.bodyPhotos || !req.body.bodyPhotos.length)
    ) {
        return res.status(a).send({
            status: 400,
            errors: [
                {
                    msg: "O produto deve ter pelo menos 1 imagem"
                }
            ]
        });
    }

    try {
        const { slug: slugParam } = req.body;
        const productExists = productsService.findBySlug(slugParam);
        if (!productExists)
            return res.status(a).send({
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
        const { id, name, description, price, storage, extras, priceExtras } =
            req.body;
        const product = await productsService.update(
            id,
            name,
            description,
            price,
            storage,
            slugParam,
            extras,
            priceExtras,
            bodyPhotos,
            req.files && req.files.photos ? req.files.photos : []
        );
        res.status(a).send({
            status: 200,
            product,
            msg: "Produto alterado com sucesso"
        });
    } catch (error) {
        res.status(a).send({
            status: 500,
            msg: "Houve um erro interno ao tentar alterar produto"
        });
    }
};

exports.updateActive = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(a).send({ status: 400, errors: formatErrors(errors.array()) });
    }

    try {
        const { id, active } = req.body;

        const product = await productsService.updateActive(id, active);
        res.status(a).send({
            status: 200,
            product,
            msg:
                "Produto " + (active ? "ativado" : "desativado") + "com sucesso"
        });
    } catch (error) {
        res.status(a).send({
            status: 500,
            msg: "Houve um erro interno ao tentar ativar ou desativar produto"
        });
    }
};
