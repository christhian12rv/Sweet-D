const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

exports.verifyJWTAdmin = async (req, res, next) => {
    const { token } = req.body;
    if (!token)
        return res.json({
            status: 401,
            auth: false,
            msg: "Usuário não está logado"
        });
    try {
        const userToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({
            where: { id: userToken.id, isAdmin: true }
        });

        if (user) req.user = user;
        else
            return res.json({
                status: 401,
                auth: false,
                msg: "Usuário inválido ou não é um administrador"
            });

        next();
    } catch (error) {
        res.json({ status: 500, msg: "Usuário inválido" });
    }
};
