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
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.create = async (req, res) => {
    logger.info(`Chamando create de ${req.originalUrl}`);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao criar usuário';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { name, email, password, phone } = req.body;

        const user = await usersService.create(name, email, password, phone);
        
        const message = 'Usuário criado com sucesso';
        logger.info(message);

        res.status(200).send({ user, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao criar usuário';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.auth = async (req, res) => {
    logger.info(`Chamando auth de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao logar usuário';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const { email } = req.body;
        
        const { token, user } = await usersService.auth(email);

        const message = 'Usuário logado com sucesso';
        logger.info(message);

        res.status(200).send({ token, user, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao logar usuário';
        logger.error(`${message}: ${error}`);

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
        logger.error(`${message}: ${error}`);

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
        const { name, email, phone  } = req.body;
        const { id } = req.user;

        const user = await usersService.update(id, name, email, phone);

        const message = 'Usuário atualizado com sucesso';
        logger.info(message);

        res.status(200).send({ user, message });
    } catch (error) {
        const message = 'Ocorreram erros internos ao atualizar usuário';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.getUserAuth = async (req, res) => {
    logger.info(`Chamando getUserAuth de ${req.originalUrl}`);

    const user = req.user;

    try {
        const message = 'Usuário logado';
        logger.info(message);

        return res.status(200).send({ user, message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao verificar usuário';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.sendRecoveryPasswordEmail = async (req, res) => {
    logger.info(`Chamando sendRecoveryPasswordEmail de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao enviar email de recuperação de senha';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message, });
    }

    try {
        const { email } = req.body;

        await usersService.sendRecoveryPasswordEmail(email);

        const message = 'Email de recuperação de senha enviado com sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao enviar email de recuperação de senha';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.verifyRecoveryPasswordEmailAndToken = async (req, res) => {
    logger.info(`Chamando verifyRecoveryPasswordEmailAndToken de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao acessar a alteração de senha';
        logger.info(message);

        return res.status(400).send({ errors: formatErrors(errors.array()), message });
    }

    try {
        const message = 'Sucesso';
        logger.info(message);

        res.status(200).send({ message, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao acessar a alteração de senha';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};

exports.recoveryPasswordChange = async (req, res) => {
    logger.info(`Chamando recoveryPasswordChange de ${req.originalUrl}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = 'Ocorreram alguns erros ao fazer a alteração de senha';
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
        const message = 'Ocorreram erros internos ao fazer a alteração de senha';
        logger.error(`${message}: ${error}`);

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
        logger.error(`${message}: ${error}`);

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
        const { name, email, message } = req.body;
        await usersService.contactSendEmail(name, email, message);

        const responseMessage = 'Email enviado com sucesso';
        logger.info(responseMessage);

        res.status(200).send({ message: responseMessage, });
    } catch (error) {
        const message = 'Ocorreram erros internos ao enviar email';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};
