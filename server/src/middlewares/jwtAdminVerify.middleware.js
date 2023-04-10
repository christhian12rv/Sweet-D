const jwt = require("jsonwebtoken");
const config = require('../configs/config');

const { UserModel } = require("../models");

exports.verifyJWTAdmin = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        const message = 'Usuário não está logado';
        logger.info(message);

        return res.status(401).send({ message });
    }

    try {
        const userToken = await jwt.verify(token, config.jwtSecret);
        const user = await UserModel.findOne({
            where: { id: userToken.id, isAdmin: true }
        });

        if (user)
            req.user = user;
        else
            return res.status(401).json({ message: "Usuário inválido ou não é um administrador" });

        next();
    } catch (error) {
        return res.status(500).json({ message: "Usuário inválido" });
    }
};
