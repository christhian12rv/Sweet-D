const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const usersService = require("../services/users.service");

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
        const { totalRows, users } = await usersService.findAll(
            parseInt(limit),
            parseInt(page),
            columnSort,
            directionSort,
            search
        );
        res.json({ status: 200, totalRows, users });
    } catch (error) {
        res.json({ status: 500, msg: "Houve um erro interno" });
    }
};

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
        const { status, auth, token, user, msg } = await usersService.auth(
            email,
            password
        );
        res.json({ status, auth, token, user, msg });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar logar usuário"
        });
    }
};

exports.logout = async (req, res) => {
    try {
        await usersService.logout();
        res.json({ status: 200, msg: "Você foi deslogado com sucesso" });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar logar usuário"
        });
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { userId, data } = req.body;

        const { status, user, msg } = await usersService.update(userId, data);
        res.json({ status, user, msg });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar mudar dados do usuário"
        });
    }
};

exports.getUserAuth = async (req, res) => {
    const { token } = req.body;

    try {
        const { user, address, status, auth, msg } =
            await usersService.getUserAuth(token);

        return res.json({
            user,
            address,
            status,
            auth,
            msg
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno"
        });
    }
};

exports.updateAddress = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const {
            userId,
            address,
            number,
            postalCode,
            city,
            state,
            district,
            complement,
            phone,
            description
        } = req.body;
        const { newAddress, status, msg } = await usersService.updateAddress(
            userId,
            address,
            number,
            postalCode,
            city,
            state,
            district,
            complement,
            phone,
            description
        );

        return res.json({
            address: newAddress,
            status,
            msg
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao tentar alterar endereço"
        });
    }
};

exports.recoveryPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { email } = req.body;

        await usersService.recoveryPassword(email);

        res.json({
            status: 200,
            msg: "Foi enviado um email de solicitação de mudança de senha para seu endereço de email. Verifique também a caixa de spam"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno"
        });
    }
};

exports.getRecoveryPasswordChange = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        res.json({
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            msg: "Houve um erro interno"
        });
    }
};

exports.recoveryPasswordChange = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { email, token, password } = req.body;
        await usersService.recoveryPasswordChange(email, token, password);
        res.json({
            status: 200,
            msg: "Senha alterada com sucesso! Faça login para continuar"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno"
        });
    }
};

exports.delete = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { id } = req.body;
        await usersService.delete(id);
        res.json({
            status: 200,
            msg: "Sua conta foi excluida com sucesso!"
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            msg: "Houve um erro interno"
        });
    }
};

exports.contactSendEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 400, errors: errors.array() });
    }

    try {
        const { name, email, message } = req.body;
        await usersService.contactSendEmail(name, email, message);
        res.json({
            status: 200,
            msg: "Email enviado com sucesso! Aguarde e responderemos em até 1 (um) dia útil"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno"
        });
    }
};
