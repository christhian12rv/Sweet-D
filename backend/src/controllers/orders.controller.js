const { validationResult } = require('express-validator');

const ordersService = require("../services/orders.service");

exports.findAllByUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await ordersService.findAllByUser(userId);
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro interno ao tentar procurar por pedidos" });
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, products } = req.body;
        const order = await ordersService.create(userId, products);
        res.json({ order, message: "Pedido criado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro interno ao tentar criar pedido" });
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { orderId, finished } = req.body;
        const order = await ordersService.update(orderId, finished);
        res.json({ order, message: "Pedido alterado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro interno ao tentar alterar pedido" });
    }
}