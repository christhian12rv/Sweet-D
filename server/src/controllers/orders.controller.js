const { validationResult } = require("express-validator");
const logger = require('../configs/logger');
const ordersService = require("../services/orders.service");
const formatErrors = require('../utils/formatErrors');

exports.findAll = async (req, res) => {
    logger.info(`Chamando findAll de ${req.originalUrl}`);

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

        const { orders, totalRows } = await ordersService.findAll(
            parseInt(limit),
            parseInt(page),
            columnSort,
            directionSort,
            search
        );

        const message = 'Pedidos buscados com sucesso';
        logger.info(message);

        res.status(200).json({ orders, totalRows, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao buscar pedidos';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.findByPk = async (req, res) => {
    logger.info(`Chamando findByPk de ${req.originalUrl}`);

    try {
        const { id } = req.params;

        const order = await ordersService.findByPk(id);

        const message = 'Pedido buscado com sucesso';
        logger.info(message);

        res.status(200).json({ order, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao buscar pedido';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.findAllByUser = async (req, res) => {
    logger.info(`Chamando findAllByUser de ${req.originalUrl}`);

    try {
        const user = req.user;
        let { limit, page, columnSort, directionSort } = req.query;
        columnSort =
            columnSort == "undefined" || columnSort == "null"
                ? undefined
                : columnSort;
        directionSort =
            directionSort == "undefined" || directionSort == "null"
                ? undefined
                : directionSort;


        const { orders, totalRows } = await ordersService.findAllByUser(
            user.id,
            parseInt(limit),
            parseInt(page),
            columnSort,
            directionSort
        );

        const message = 'Pedido buscado com sucesso';
        logger.info(message);

        res.status(200).json({ orders, totalRows, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao buscar pedido';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.create = async (req, res) => {
    logger.info(`Chamando create de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao criar pedido';
        logger.info(message);

        return res.status(400).json({ errors: formatErrors(errors.array()), message });
    }

    try {
        const user = req.user;
        const { productsChoices, date } = req.body;

        const order = await ordersService.create(user.id, productsChoices, date);

        const message = 'Pedido criado com sucesso';
        logger.info(message);
        
        res.json({ order, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao criar pedido';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.update = async (req, res) => {
    logger.info(`Chamando update de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao atualizar pedido';
        logger.info(message);

        return res.status(400).json({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { orderId, finished } = req.body;
        const order = await ordersService.update(orderId, finished);

        const message = 'Pedido atualizado com sucesso';
        logger.info(message);

        res.status(200).json({ order, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao atualizar pedido';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.updateFinish = async (req, res) => {
    logger.info(`Chamando updateFinish de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao finalizar pedido';
        logger.info(message);

        return res.status(400).json({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { id } = req.body;

        await ordersService.updateFinish(id);

        const message = 'Pedido atualizado com sucesso';
        logger.info(message);

        res.status(200).json({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao finalizar pedido';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};
