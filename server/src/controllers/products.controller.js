const { validationResult } = require("express-validator");
const logger = require('../configs/logger');
const productsService = require("../services/products.service");
const formatErrors = require('../utils/formatErrors');
const createAndFormatError = require('../utils/createAndFormatError');

exports.findBySlug = async (req, res) => {
    logger.info(`Chamando findBySlug de ${req.originalUrl}`);

    try {
        let { slug } = req.params;

        const product = await productsService.findBySlug(slug);

        if (!product) {
            const message = 'Não existe um produto com esse slug';
            logger.info(message);

            return res.status(404).send({ errors: ['Não existe um produto com esse slug'], message });
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
            slugNotFilter,
            filterActives,
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

        if (filterActives && (filterActives.toLowerCase() !== 'y' && filterActives.toLowerCase() !== 'n'))
            filterActives = 'n';

        const { totalRows, products, minPrice, maxPrice } =
            await productsService.findAll(
                parseInt(limit),
                parseInt(page),
                columnSort,
                directionSort,
                search,
                priceFilter ? JSON.parse(priceFilter) : priceFilter,
                slugNotFilter,
                filterActives
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

exports.findAllByIds = async (req, res) => {
    logger.info(`Chamando findAllByIds de ${req.originalUrl}`);

    try {
        const { ids } = req.query;

        const products = await productsService.findAllByIds(ids);

        const message = 'Produtos buscados com sucesso';
        logger.info(message);

        res.status(200).send({ products, message });
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
        const message = 'Ocorreram alguns erros ao criar produto';
        logger.info(message);

        return res.status(400).send({ errors: createAndFormatError("O produto deve ter pelo menos 1 imagem", "photos"), message, });
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

    if (!req.files || Object.keys(req.files).length === 0) {
        const message = 'Ocorreram alguns erros ao criar produto';
        logger.info(message);

        return res.status(400).send({ errors: createAndFormatError("O produto deve ter pelo menos 1 imagem", "photos"), message, });
    }

    try {

        const { id, active, name, description, slug, sizes, ingredientTypes, ingredients } =
            req.body;
            
        const product = await productsService.update(
            id,
            active,
            name,
            description,
            slug,
            sizes,
            ingredientTypes,
            ingredients,
            req.files.photos
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
