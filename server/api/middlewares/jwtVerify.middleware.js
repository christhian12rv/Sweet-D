const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

exports.verifyJWT = async (req, res, next) => {
    const { token } = req.body;
    if (!token)
        return res.json({
            status: 401,
            auth: false,
            message: "Usuário não está logado"
        });
    try {
        const userToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findByPk(userToken.id);
        req.user = user;

        next();
    } catch (error) {
        res.json({ status: 500, message: "Usuário inválido" });
    }
};
