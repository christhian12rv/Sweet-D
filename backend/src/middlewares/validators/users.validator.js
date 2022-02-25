const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const axios = require("axios");

const UserModel = require("../../models/User.model");

const statesObj = {
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins"
};

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

exports.update = [
    body("data.name")
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

    body("data.email")
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

    body("data.password")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O campo Senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha informada é inválida")
        .bail()
        .isLength({ min: 8 })
        .withMessage("A Senha deve conter no mínimo 8 caracteres"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("O campo Senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha informada é inválida")
        .bail()
        .isLength({ min: 8 })
        .withMessage("A Senha deve conter no mínimo 8 caracteres")
        .bail()
        .custom((value, { req }) => {
            return UserModel.findOne({ where: { id: req.body.userId } })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(user => {
                    if (user) {
                        if (!bcrypt.compareSync(value, user.password))
                            return Promise.reject("Senha inválida");
                    } else return Promise.reject("Usuário inválido");
                });
        })
];

exports.address = [
    body("address")
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
        .withMessage("O campo Endereço é obrigatório")
        .bail()
        .isString()
        .withMessage("O Endereço informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Endereço deve conter no mínimo 2 caracteres"),

    body("number")
        .trim()
        .notEmpty()
        .withMessage("O campo Número é obrigatório"),

    body("postalCode")
        .custom((value, { req }) => {
            return true;
        })
        .trim()
        .notEmpty()
        .withMessage("O campo CEP é obrigatório")
        .bail()
        .isString()
        .withMessage("O CEP informado é inválido")
        .bail()
        .isLength({ min: 10, max: 10 })
        .withMessage("O CEP informado é inválido")
        .bail()
        .matches(/[0-9]{2}.[0-9]{3}-[\d]{3}/)
        .withMessage("O CEP informado é inválido")
        .bail()
        .custom((value, { req }) => {
            return axios
                .get(
                    "https://viacep.com.br/ws/" +
                        value.replace("-", "").replace(".", "") +
                        "/json/unicode/"
                )
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno");
                })
                .then(response => {
                    const data = response.data;
                    if ("erro" in data)
                        return Promise.reject("O CEP informado é inválido");
                    else {
                        req.body.state = statesObj[data.uf];
                        req.body.city = data.localidade;
                    }
                });
        }),

    body("city")
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
        .withMessage("O campo Cidade é obrigatório")
        .bail()
        .isString()
        .withMessage("A Cidade informada é inválida")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Cidade deve conter no mínimo 2 caracteres"),

    body("state")
        .trim()
        .notEmpty()
        .withMessage("O campo Estado é obrigatório")
        .bail()
        .isString()
        .withMessage("O Estado informado é asdfinválido")
        .bail()
        .isIn([
            "Acre",
            "Alagoas",
            "Amapá",
            "Amazonas",
            "Bahia",
            "Ceará",
            "Distrito Federal",
            "Espírito Santo",
            "Goías",
            "Maranhão",
            "Mato Grosso",
            "Mato Grosso do Sul",
            "Minas Gerais",
            "Pará",
            "Paraíba",
            "Paraná",
            "Pernambuco",
            "Piauí",
            "Rio de Janeiro",
            "Rio Grande do Norte",
            "Rio Grande do Sul",
            "Rondônia",
            "Roraíma",
            "Santa Catarina",
            "São Paulo",
            "Sergipe",
            "Tocantins"
        ])
        .withMessage("O Estado informado é inválido"),

    body("district")
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
        .withMessage("O campo Bairro é obrigatório")
        .bail()
        .isString()
        .withMessage("O Bairro informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Bairro deve conter no mínimo 2 caracteres"),

    body("complement")
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
        .withMessage("O Complemento informado é inválido"),

    body("phone")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O Telefone informado é inválido")
        .bail()
        .isString()
        .withMessage("O Telefone informado é inválido")
        .bail()
        .isLength({ min: 14, max: 15 })
        .withMessage("O Telefone informado é inválido")
        .bail()
        .matches(/\(\d{2,}\) \d{4,}\-\d{4}/)
        .withMessage("O Telefone informado é inválido"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("A Descrição informada é inválida")
];
