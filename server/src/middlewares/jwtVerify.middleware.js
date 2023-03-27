const jwt = require("jsonwebtoken");
const config = require('../configs/config');
const logger = require('../configs/logger');

const { UserModel } = require("../models");

exports.verifyJWT = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        const message = 'Usuário não está logado';
        logger.info(message);

        return res.status(401).send({ message });
    }

    try {
        const userToken = await jwt.verify(token, config.jwtSecret);
        const user = await UserModel.findByPk(userToken.id);
        req.user = user;

        next();
    } catch (error) {
        const message = 'Ocorreram erros internos ao verificar usuário';
        logger.error(message);

        res.status(500).send({ message, });
    }
};
