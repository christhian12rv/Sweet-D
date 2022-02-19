const { body } = require("express-validator");

const UserModel = require("../../models/User.model");

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
