const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

exports.verifyJWTAdmin = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ auth: false, message: 'Usuário não está logado' });
    try {
        const userToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ where: { id: userToken.id, isAdmin: true } });

        if (user)
            req.user = user;
        else
            return res.status(401).json({ auth: false, message: "Usuário inválido ou não é um administrador" });

        next();
    } catch (error) {
        res.status(500).json({ message: "Usuário inválido" });
    }
};