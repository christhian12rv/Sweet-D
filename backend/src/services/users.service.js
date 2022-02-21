const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

exports.create = async (name, email, password) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
        name,
        email,
        password: hashPassword
    });
    return user;
};

exports.auth = async (email, password) => {
    let user = await UserModel.findOne({ where: { email } });
    if (user) {
        if (!bcrypt.compareSync(password, user.password))
            return { status: 400, msg: "Senha inválida" };

        const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        user = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        };
        return {
            status: 200,
            auth: true,
            user,
            token,
            msg: "Usuário logado com sucesso"
        };
    } else return { status: 400, msg: "Usuário inválido" };
};

exports.logout = async () => {
    await jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: 1
    });
};

exports.findAll = async () => {
    const users = await UserModel.findAll();
    return users;
};

exports.getUserAuth = async token => {
    if (!token)
        return {
            user: null,
            status: 401,
            auth: false,
            msg: "Usuário não está logado"
        };

    const userToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findByPk(userToken.id);

    if (!userToken)
        return {
            user: null,
            status: 401,
            auth: false,
            msg: "Usuário não está logado"
        };

    return {
        user,
        status: 200,
        auth: true,
        msg: "Usuário está logado"
    };
};
