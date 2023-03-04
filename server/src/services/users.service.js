const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { transporter, nodemailerEmail } = require("../configs/nodemailer");
const { v4: uuidv4 } = require("uuid");
const recoveryPasswordTemplate = require("../templates/recoveryPassword");
const contactTemplate = require("../templates/contact");

const UserModel = require("../models/User.model");
const AddressModel = require("../models/Address.model");
const OrderModel = require("../models/Order.model");
const ChangePasswordTokenModel = require("../models/ChangePasswordToken.model");

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

    let users = result.rows;
    users = await Promise.all(
        users.map(async user => {
            const address = await AddressModel.findOne({
                where: { userId: user.id }
            });
            user.setDataValue("address", address);
            return user;
        })
    );

    return { totalRows: result.count, users };
};

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
    let user = await UserModel.findOne({ where: { email } });
    if (user) {
        if (!bcrypt.compareSync(password, user.password))
            return { status: 400, msg: "Senha inválida" };

        const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        user = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        };
        return {
            status: 200,
            auth: true,
            user,
            token,
            msg: "Usuário logado com sucesso"
        };
    } else return { status: 400, msg: "Usuário inválido" };
};

exports.logout = async () => {
    await jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: 1
    });
};

exports.update = async (userId, data) => {
    await UserModel.update(data, {
        where: { id: userId }
    });
    const user = await UserModel.findByPk(userId);
    return { status: 200, user, msg: "Usuário alterado com sucesso" };
};

exports.getUserAuth = async token => {
    if (!token)
        return {
            user: null,
            status: 401,
            auth: false,
            msg: "Usuário não está logado"
        };

    const userToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findByPk(userToken.id);

    if (!userToken)
        return {
            user: null,
            status: 401,
            auth: false,
            msg: "Usuário não está logado"
        };

    const address = await AddressModel.findOne({ where: { userId: user.id } });

    return {
        user,
        address,
        status: 200,
        auth: true,
        msg: "Usuário está logado"
    };
};

exports.updateAddress = async (
    userId,
    address,
    number,
    postalCode,
    city,
    state,
    district,
    complement,
    phone,
    description
) => {
    const addressExists = await AddressModel.findOne({ where: { userId } });
    let newAddress;
    if (addressExists) {
        await AddressModel.update(
            {
                userId,
                address,
                number,
                postalCode,
                city,
                state,
                district,
                complement,
                phone,
                description
            },
            {
                where: { userId }
            }
        );
        newAddress = await AddressModel.findOne({ where: { userId } });
    } else {
        newAddress = await AddressModel.create({
            userId,
            address,
            number,
            postalCode,
            city,
            state,
            district,
            complement,
            phone,
            description
        });
    }

    return { newAddress, status: 200, msg: "Endereço atualizado com sucesso" };
};

exports.recoveryPassword = async email => {
    const user = await UserModel.findOne({ where: { email } });
    await ChangePasswordTokenModel.create({ userId: user.id, token: uuidv4() });
    const changePasswordToken = await ChangePasswordTokenModel.findOne({
        where: { userId: user.id }
    });
    await transporter.sendMail({
        from: '"Sweet D" <' + nodemailerEmail + ">",
        to: email,
        subject: "Olá " + user.name,
        html: recoveryPasswordTemplate(
            process.env.SITE_URL,
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
    await AddressModel.destroy({ where: { userId: id } });
    await OrderModel.update({ userId: null }, { where: { userId: id } });
    await UserModel.destroy({ where: { id } });
};

exports.contactSendEmail = async (name, email, message) => {
    await transporter.sendMail({
        from: '"' + name + '" <' + nodemailerEmail + ">",
        to: nodemailerEmail,
        subject: "Nova mensagem de " + name + " (" + email + ")",
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
