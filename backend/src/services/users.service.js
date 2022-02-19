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
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
        if (!bcrypt.compareSync(password, user.password))
            return { status: 400, msg: "Senha inválida" };

        const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return {
            status: 200,
            auth: true,
            token,
            msg: "Usuário logado com sucesso"
        };
    } else return { status: 400, msg: "Usuário inválido" };
};

exports.logout = async () => {
    await jwt.sign("", "", {
        expiresIn: 1
    });
};

exports.findAll = async () => {
    const users = await UserModel.findAll();
    return users;
};
