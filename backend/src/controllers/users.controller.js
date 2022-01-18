const { validationResult } = require('express-validator');

const UserModel = require("../models/User.model");

const usersService = require("../services/users.service");

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        const user = await usersService.create(name, email, password);
        res.json({ user, message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro interno ao tentar cadastrar usuário" });
    }
}

exports.list = async (req, res) => {
    try {
        const users = await usersService.findAll();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro interno" });
    }
}