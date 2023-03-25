const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { transporter, nodemailerEmail } = require("../configs/nodemailer");
const { v4: uuidv4 } = require("uuid");
const recoveryPasswordTemplate = require("../templates/recoveryPassword");
const contactTemplate = require("../templates/contact");

const { UserModel } = require("../models");
const { OrderModel } = require("../models");
const { ChangePasswordTokenModel } = require("../models");
const config = require('../configs/config');

exports.findAll = async (
    limit = -1,
    page = 1,
    columnSort = "id",
    directionSort = "asc",
    search = ""
) => {
    const result = await UserModel.findAndCountAll({
        limit,
        offset: limit * (page - 1),
        order: [[columnSort, directionSort]],
        where: {
            name: {
                [Op.like]: "%" + search + "%"
            }
        }
    });

    const users = result.rows;

    return { totalRows: result.count, users };
};

exports.create = async (name, email, password, phone) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
        name,
        email,
        password: hashPassword,
        phone,
    });
    
    return user;
};

exports.auth = async (email) => {
    let user = await UserModel.findOne({ where: { email } });

    const token = await jwt.sign({ id: user.id }, config.jwtSecret);

    user = {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
    };
    return { user, token, };
};

exports.logout = async () => {
    await jwt.sign({}, config.jwtSecret, {
        expiresIn: 1
    });
};

exports.update = async (userId, data) => {
    await UserModel.update(data, {
        where: { id: userId }
    });

    const user = await UserModel.findByPk(userId);

    return user;
};

exports.sendRecoveryPasswordEmail = async email => {
    const user = await UserModel.findOne({ where: { email } });

    await ChangePasswordTokenModel.create({ userId: user.id, token: uuidv4() });

    const changePasswordToken = await ChangePasswordTokenModel.findOne({
        where: { userId: user.id }
    });
    await transporter.sendMail({
        from: '"Sweet D" <' + nodemailerEmail + ">",
        to: email,
        subject: "SweetD - Recuperação de Senha",
        html: recoveryPasswordTemplate(
            config.clientUrl,
            user.name,
            email,
            changePasswordToken.token
        ),
        attachments: [
            {
                filename: "Logo.png",
                path: path.join(__dirname, "../public/img/Logo.png"),
                cid: "unique@logo"
            }
        ]
    });
};

exports.recoveryPasswordChange = async (email, token, password) => {
    const hashPassword = bcrypt.hashSync(password, 10);

    await UserModel.update(
        {
            password: hashPassword
        },
        { where: { email } }
    );

    const user = await UserModel.findOne({ where: { email } });
    
    await ChangePasswordTokenModel.destroy({
        where: { userId: user.id, token }
    });
};

exports.delete = async id => {
    await OrderModel.update({ userId: null }, { where: { userId: id } });

    await UserModel.destroy({ where: { id } });
};

exports.contactSendEmail = async (name, email, message) => {
    await transporter.sendMail({
        from: '"' + name + '" <' + nodemailerEmail + ">",
        to: nodemailerEmail,
        subject: "Nova mensagem recebida de " + name + " (" + email + ")",
        html: contactTemplate(name, email, message),
        attachments: [
            {
                filename: "Logo.png",
                path: path.join(__dirname, "../public/img/Logo.png"),
                cid: "unique@logo"
            }
        ]
    });
};
