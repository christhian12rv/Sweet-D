const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const { UserModel } = require("../../models");
const { ChangePasswordTokenModel } = require("../../models");

exports.create = [
    body("name")
        .trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, " da ")
                .replace(/ De /g, " de ")
                .replace(/ Do /g, " do ")
                .replace(/ Das /g, " das ")
                .replace(/ Dos /g, " dos ");
        })
        .notEmpty()
        .withMessage("O campo Nome é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Nome deve conter no mínimo 2 caracteres"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("O campo Email é obrigatório")
        .bail()
        .isEmail()
        .withMessage("O Email informado é inválido")
        .bail()
        .custom(value => {
            return UserModel.findOne({ where: { email: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (user)
                        return Promise.reject("Já existe um usuário cadastrado com o Email informado");
                });
        }),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("O campo Telefone é obrigatório")
        .bail()
        .isMobilePhone('pt-BR')
        .withMessage("O Telefone informado é inválido"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("O campo Senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha informada é inválida")
        .bail()
        .isLength({ min: 8 })
        .withMessage("A Senha deve conter no mínimo 8 caracteres"),

    body("confirmPassword")
        .trim()
        .notEmpty()
        .withMessage("O campo Confirmar senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha do campo Confirmar Senha informada é inválida")
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.password)
                throw new Error("As senhas não correspondem");

            return true;
        })
];

exports.auth = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('O campo Email é obrigatório')
        .bail()
        .isEmail()
        .withMessage('Email inválido')
        .bail()
        .custom((value, { req }) => {
            return UserModel.findOne({ where: { email: value, }, })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (user) {
                        if (!bcrypt.compareSync(req.body.password, user.password))
                            return Promise.reject("Senha inválida");

                    } else return Promise.reject("Usuário inválido");
                });
        }),

    body('password')
        .trim()
        .notEmpty()
        .withMessage("O campo Senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha informada é inválida")
        .bail()
        .isLength({ min: 8 })
        .withMessage("A Senha deve conter no mínimo 8 caracteres")
]

exports.update = [
    body("name")
        .optional()
        .trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, " da ")
                .replace(/ De /g, " de ")
                .replace(/ Do /g, " do ")
                .replace(/ Das /g, " das ")
                .replace(/ Dos /g, " dos ");
        })
        .notEmpty()
        .withMessage("O campo Nome é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Nome deve conter no mínimo 2 caracteres"),

    body("email")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O campo Email é obrigatório")
        .bail()
        .isString()
        .withMessage("O Email informado é inválido")
        .bail()
        .isEmail()
        .withMessage("O Email informado é inválido")
        .bail()
        .custom(value => {
            return UserModel.findOne({ where: { email: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (user)
                        return Promise.reject(
                            "Já existe um usuário cadastrado com o Email informado"
                        );
                });
        }),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("O campo Telefone é obrigatório")
        .bail()
        .isMobilePhone('pt-BR')
        .withMessage("O Telefone informado é inválido"),
];

exports.sendRecoveryPasswordEmail = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("O campo Email é obrigatório")
        .bail()
        .isString()
        .withMessage("O Email informado é inválido")
        .bail()
        .isEmail()
        .withMessage("O Email informado é inválido")
        .bail()
        .custom(value => {
            return UserModel.findOne({ where: { email: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (!user)
                        return Promise.reject(
                            "O Email informado não está cadastrado"
                        );
                    else {
                        return ChangePasswordTokenModel.findOne({
                            where: { userId: user.id }
                        })
                            .catch(erro => {
                                return Promise.reject(
                                    "Ocorreu um erro interno"
                                );
                            })
                            .then(changePasswordToken => {
                                if (changePasswordToken)
                                    return Promise.reject(
                                        "Já foi enviado um email de mudança de senha para você. Você só poderá solicitar outra troca de senha após 24 horas da última vez que você solicitou. Caso ocorra algum problema, entre em contato conosco."
                                    );
                            });
                    }
                });
        })
];

exports.verifyRecoveryPasswordEmailAndToken = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("O campo Email é obrigatório")
        .bail()
        .isString()
        .withMessage("O Email informado é inválido")
        .bail()
        .isEmail()
        .withMessage("O Email informado é inválido")
        .bail()
        .custom(value => {
            return UserModel.findOne({ where: { email: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (!user)
                        return Promise.reject(
                            "O Email informado não está cadastrado"
                        );
                });
        }),

    body("token")
        .trim()
        .notEmpty()
        .withMessage("O Token informado é inválido")
        .bail()
        .isString()
        .withMessage("O Token informado é inválido")
        .bail()
        .bail()
        .custom((value, { req }) => {
            return ChangePasswordTokenModel.findOne({ where: { token: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(changePasswordToken => {
                    if (!changePasswordToken)
                        return Promise.reject('O Token informado é inválido');
                    else {
                        return UserModel.findOne({
                            where: { id: changePasswordToken.userId }
                        })
                            .catch(erro => {
                                return Promise.reject(
                                    "Ocorreu um erro interno"
                                );
                            })
                            .then(user => {
                                if (!user)
                                    return Promise.reject(
                                        'Email inválido'
                                    );
                            });
                    }
                });
        })
];

exports.recoveryPasswordChange = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("O campo Email é obrigatório")
        .bail()
        .isString()
        .withMessage("O Email informado é inválido")
        .bail()
        .isEmail()
        .withMessage("O Email informado é inválido")
        .bail()
        .custom(value => {
            return UserModel.findOne({ where: { email: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (!user)
                        return Promise.reject(
                            "O Email informado não está cadastrado"
                        );
                });
        }),

    body("token")
        .trim()
        .notEmpty()
        .withMessage("O Token informado é inválido")
        .bail()
        .isString()
        .withMessage("O Token informado é inválido")
        .bail()
        .bail()
        .custom((value, { req }) => {
            return ChangePasswordTokenModel.findOne({ where: { token: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(tokenRecord => {
                    if (!tokenRecord)
                        return Promise.reject("O Token informado é inválido");
                    else {
                        return UserModel.findOne({
                            where: { id: tokenRecord.userId }
                        })
                            .catch(erro => {
                                return Promise.reject(
                                    "Ocorreu um erro interno"
                                );
                            })
                            .then(user => {
                                if (!user)
                                    return Promise.reject(
                                        "Email inválido"
                                    );
                            });
                    }
                });
        }),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("O campo Senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha informada é inválida")
        .bail()
        .isLength({ min: 8 })
        .withMessage("A Senha deve conter no mínimo 8 caracteres"),

    body("confirmPassword")
        .trim()
        .notEmpty()
        .withMessage("O campo Confirmar senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha do campo Confirmar Senha informada é inválida")
        .bail()
        .isLength({ min: 8 })
        .withMessage("A Senha deve conter no mínimo 8 caracteres")
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.password)
                throw new Error("As senhas não correspondem");

            return true;
        })
];

exports.delete = [
    body("id")
        .trim()
        .notEmpty()
        .withMessage("O campo Id é obrigatório")
        .bail()
        .custom(value => {
            return UserModel.findOne({ where: { id: value } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (!user)
                        return Promise.reject("O Id informado é inválido");
                });
        })
];

exports.contactSendEmail = [
    body("name")
        .trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, " da ")
                .replace(/ De /g, " de ")
                .replace(/ Do /g, " do ")
                .replace(/ Das /g, " das ")
                .replace(/ Dos /g, " dos ");
        })
        .notEmpty()
        .withMessage("O campo Nome é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Nome deve conter no mínimo 2 caracteres"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("O campo Email é obrigatório")
        .bail()
        .isString()
        .withMessage("O Email informado é inválido")
        .bail()
        .isEmail()
        .withMessage("O Email informado é inválido"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("O campo Mensagem é obrigatório")
        .bail()
        .isString()
        .withMessage("O Mensagem informado é inválido")
        .bail()
        .isLength({ min: 10 })
        .withMessage("O campo Mensagem deve conter no mínimo 10 caracteres"),
];
