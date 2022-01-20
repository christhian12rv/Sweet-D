const { validationResult } = require('express-validator');

const cartService = require("../services/cart.service");

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, product } = req.body;
        await cartService.create(req.session, userId, product);
        res.json({ session_products: req.session.products, message: "Produto adicionado ao carrinho com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro interno ao tentar adicionar produto ao carrinho" });
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, product } = req.body;
        await cartService.update(req.session, userId, product);
        res.json({ session_products: req.session.products, message: "Produto adicionado ao carrinho com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro interno ao tentar adicionar produto ao carrinho" });
    }
}