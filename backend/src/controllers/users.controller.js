const { validationResult } = require("express-validator");

const usersService = require("../services/users.service");

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        const user = await usersService.create(name, email, password);
        res.json({
            status: 200,
            user,
            msg: "Usuário cadastrado com sucesso, faça login para continuar"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar cadastrar usuário"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { status, auth, token, msg } = await usersService.auth(
            email,
            password
        );
        res.json({ status, auth, token, msg });
    } catch (error) {
        res.status(500).json({
            msg: "Houve um erro interno ao tentar logar usuário"
        });
    }
};

exports.logout = async (req, res) => {
    try {
        await usersService.logout();
        res.json({ msg: "Você foi deslogado com sucesso" });
    } catch (error) {
        res.status(500).json({
            msg: "Houve um erro interno ao tentar logar usuário"
        });
    }
};

exports.find = async (req, res) => {
    try {
        const users = await usersService.findAll();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ msg: "Houve um erro interno" });
    }
};
