const logger = require('../configs/logger');
const indexService = require("../services/index.service");

exports.getDashboard = async (req, res) => {
    logger.info(`Chamando getDashboard de ${req.originalUrl}`);

    try {
        const {
            totalQuantityOrders,
            totalQuantityProducts,
            totalQuantityUsers,
            totalPriceOrders,
            ordersPerYear,
            usersPerYear,
            topSellingProducts,
        } = await indexService.getDashboard();

        const message = 'Dados buscados com sucesso';
        logger.info(message);

        res.status(200).json({
            totalQuantityOrders,
            totalQuantityProducts,
            totalQuantityUsers,
            totalPriceOrders,
            ordersPerYear,
            usersPerYear,
            topSellingProducts,
            message,
        });
    } catch (error) {
        const message = 'Ocorreram erros internos ao buscar dados';
        logger.error(`${message}: ${error}`);

        res.status(500).send({ message, });
    }
};
