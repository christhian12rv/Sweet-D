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
        logger.error(`${message}: ${error}`);

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
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.create = async (req, res) => {
    logger.info(`Chamando create de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao criar produto';
        logger.info(message);
        
        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ errors: ["O produto deve ter pelo menos 1 imagem"], });
    }

    try {
        const { name, description, slug, sizes, ingredientTypes, ingredients } = req.body;

        const product = await productsService.create(
            name,
            description,
            slug,
            sizes,
            ingredientTypes,
            ingredients,
            req.files.photos
        );
        
        const message = 'Produto criado com sucesso';
        logger.info(message);

        res.status(200).send({ product, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao criar produto';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.update = async (req, res) => {
    logger.info(`Chamando update de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao atualizar produto';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    if ((!req.files || Object.keys(req.files).length === 0) &&
        (!req.body.bodyPhotos || !req.body.bodyPhotos.length)) {
        const message = 'Ocorreram alguns erros ao atualizar produto';
        logger.info(message);

        return res.status(400).send({ errors: ['O produto deve ter pelo menos 1 imagem'], message });
    }

    if (typeof req.body.bodyPhotos != "object")
        req.body.bodyPhotos = [req.body.bodyPhotos];

    const bodyPhotos = [];
    if (req.body.bodyPhotos) {
        req.body.bodyPhotos.forEach(b => {
            if (b)
                bodyPhotos.push(JSON.parse(b));
        });
    }

    try {

        const { id, name, description, slug, sizes, ingredientTypes, ingredients } =
            req.body;
            
        const product = await productsService.update(
            id,
            name,
            description,
            slug,
            sizes,
            ingredientTypes,
            ingredients,
            bodyPhotos,
            req.files && req.files.photos ? req.files.photos : []
        );

        const message = 'Produto atualizado com sucesso';
        logger.info(message);

        res.status(200).send({ product, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao atualizar produto';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.updateActive = async (req, res) => {
    logger.info(`Chamando updateActive de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao atualizar active do produto';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { id, active } = req.body;

        const product = await productsService.updateActive(id, active);
        
        res.status(200).send({ product, message, });
    } catch (error) {
        const message = 'Ocorreram erros itnernos ao atualizar active do produto';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};
