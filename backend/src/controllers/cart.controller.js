const { validationResult } = require("express-validator");

const cartService = require("../services/cart.service");

exports.getAllData = async (req, res) => {
    try {
        let { productsIds } = req.query;
        productsIds = JSON.parse(productsIds);
        const products = await cartService.getAllData(productsIds);

        res.json({
            status: 200,
            products,
            msg: "Produtos buscados com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao procurar items no carrinho"
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        res.json({
            status: 200,
            session_products: req.session.products,
            msg: "Produtos buscados com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao procurar items no carrinho"
        });
    }
};

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { product } = req.body;

        const newProduct = await cartService.create(req.session, product);
        res.json({
            status: 200,
            product: newProduct,
            session_products: req.session.products,
            msg: "Produto " + newProduct.name + " adicionado ao carrinho"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar adicionar produto ao carrinho"
        });
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { product } = req.body;

        const newProduct = await cartService.update(req.session, product);
        res.json({
            status: 200,
            product: newProduct,
            session_products: req.session.products,
            msg: "Produto adicionado ao carrinho com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar adicionar produto ao carrinho"
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await cartService.remove(req.session, id);

        res.json({
            status: 200,
            session_products: req.session.products,
            msg: "Produto retirado do carrinho com sucesso"
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar retirar produto do carrinho"
        });
    }
};

exports.clear = async (req, res) => {
    try {
        await cartService.clear(req.session);

        res.json({
            status: 200,
            msg: "Carrinho limpo com sucesso"
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar limpar carrinho"
        });
    }
};
