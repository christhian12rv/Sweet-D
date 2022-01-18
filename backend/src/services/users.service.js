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
}

exports.auth = async (email, password) => {
    const user = await UserModel.findOne({ where: { email } })
    if (user) {
        if (!bcrypt.compareSync(password, user.password))
            return res.status(400).json({ message: "Senha inválida" });
        const token = jwt.sign({ user }, process.env.SECRET,);
        return res.json({ auth: true, token: token });
    } else
        return res.status(400).json({ message: "Usuário inválido" });

    res.status(500).json({ message: 'Login inválido!' });
}

exports.findAll = async () => {
    const users = await UserModel.findAll();
    return users;
}