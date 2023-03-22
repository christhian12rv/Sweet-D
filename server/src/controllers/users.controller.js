const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const logger = require('../configs/logger');
const formatErrors = require('../utils/formatErrors');

const usersService = require("../services/users.service");

exports.findAll = async (req, res) => {
    logger.info(`Chamando findAll de ${req.originalUrl}`);

    try {
        let { limit, page, columnSort, directionSort, search } = req.query;

        columnSort =
            columnSort == "undefined" || columnSort == "null"
                ? undefined
                : columnSort;
                
        directionSort =
            directionSort == "undefined" || directionSort == "null"
                ? undefined
                : directionSort;

                
        const { totalRows, users } = await usersService.findAll(
            parseInt(limit),
            parseInt(page),
            columnSort,
            directionSort,
            search
        );
            
        const message = 'Usuários buscados com sucesso';
        logger.info(message);

        res.status(200).send({ totalRows, users, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao buscar usuários';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.register = async (req, res) => {
    logger.info(`Chamando register de ${req.originalUrl}`);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao registrar usuário';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { name, email, password } = req.body;

        const user = await usersService.create(name, email, password);
        
        const message = 'Usuário cadastrado com sucesso';
        logger.info(message);

        res.status(200).send({ user, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao registrar usuário';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.login = async (req, res) => {
    logger.info(`Chamando login de ${req.originalUrl}`);

    try {
        const { email, password } = req.body;
        
        const { auth, token, user } = await usersService.auth(email, password);

        const message = 'Usuário logado com sucesso';
        logger.info(message);

        res.status(200).send({ auth, token, user, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao logar usuário';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.logout = async (req, res) => {
    logger.info(`Chamando logout de ${req.originalUrl}`);
    
    try {
        await usersService.logout();

        const message = 'Usuário deslogado com sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao deslogar usuário';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.update = async (req, res) => {
    logger.info(`Chamando update de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao atualizar usuário';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { userId, data } = req.body;

        const { user } = await usersService.update(userId, data);

        const message = 'Usuário atualizado com sucesso';
        logger.info(message);

        res.status(200).send({ user, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao atualizar usuário';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.getUserAuth = async (req, res) => {
    logger.info(`Chamando getUserAuth de ${req.originalUrl}`);

    const { token } = req.body;

    try {
        const { user, address, auth, } =
            await usersService.getUserAuth(token);

        const message = 'Usuário logado';
        logger.info(message);

        return res.status(200).send({ user, address, auth, message, });
    } catch (error) {
        const message = 'Ocorreram errors internos ao verificar usuário';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.recoveryPassword = async (req, res) => {
    logger.info(`Chamando recoveryPassword de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao fazer a recuperação de senha';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message, });
    }

    try {
        const { email } = req.body;

        await usersService.recoveryPassword(email);

        const message = 'Recuperação de senha enviada com sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao fazer a recuperação de senha';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.getRecoveryPasswordChange = async (req, res) => {
    logger.info(`Chamando getRecoveryPasswordChange de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao fazer a troca de senha';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const message = 'Sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao fazer a troca de senha';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.recoveryPasswordChange = async (req, res) => {
    logger.info(`Chamando recoveryPasswordChange de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao fazer a troca de senha';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { email, token, password } = req.body;
        await usersService.recoveryPasswordChange(email, token, password);

        const message = 'Senha alterada com sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao fazer a troca de senha';
        logger.error(message);

        res.status(500).send({ message, });
    }
};

exports.delete = async (req, res) => {
    logger.info(`Chamando delete de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao deletar usuário';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { id } = req.body;
        await usersService.delete(id);

        const message = 'Usuário deletado com sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao deletar usuário';
        logger.error(message);

        res.status(a).send({ message, });
    }
};

exports.contactSendEmail = async (req, res) => {
    logger.info(`Chamando contactSendEmail de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao enviar email';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { name, email, } = req.body;
        await usersService.contactSendEmail(name, email, message);

        const message = 'Email enviado com sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao enviar email';
        logger.error(message);

        res.status(500).send({ message, });
    }
};
