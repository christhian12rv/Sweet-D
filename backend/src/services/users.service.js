const bcrypt = require("bcrypt");

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

exports.findAll = async () => {
    const users = await UserModel.findAll();
    return users;
}