const { validationResult } = require("express-validator");

const ordersService = require("../services/orders.service");

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

        const { orders, totalRows } = await ordersService.findAll(
            parseInt(limit),
            parseInt(page),
            columnSort,
            directionSort,
            search
        );

        res.json({ status: 200, orders, totalRows });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar procurar por pedidos"
        });
    }
};

exports.findByPk = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await ordersService.findByPk(id);
        res.json({ status: 200, order });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar procurar por pedidos"
        });
    }
};

exports.findAllByUser = async (req, res) => {
    try {
        const user = req.user;
        const { orders, totalRows } = await ordersService.findAllByUser(
            user.id
        );
        res.json({ status: 200, orders, totalRows });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar procurar por pedidos"
        });
    }
};

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { products } = req.body;
        const user = req.user;

        const response = await ordersService.create(user.id, products);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar fazer pedido"
        });
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { orderId, finished } = req.body;
        const order = await ordersService.update(orderId, finished);
        res.json({
            status: 200,
            order,
            msg: "Pedido alterado com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar alterar pedido"
        });
    }
};

exports.updateFinish = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { id } = req.body;

        await ordersService.updateFinish(id);
        res.json({
            status: 200,
            msg: "Pedido concluído com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar finalizar pedido"
        });
    }
};
