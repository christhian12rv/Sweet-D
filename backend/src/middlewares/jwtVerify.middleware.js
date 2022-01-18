const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

exports.verifyJWT = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ auth: false, message: 'Usuário não está logado' });
    try {
        const userToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findByPk(userToken.id);
        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({ message: "Usuário inválido" });
    }
};