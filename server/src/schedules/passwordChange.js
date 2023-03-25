const schedule = require("node-schedule");
const Sequelize = require("sequelize");
const logger = require('../configs/logger');
const Op = Sequelize.Op;
const { ChangePasswordTokenModel } = require("../models");

module.exports = () => {
    schedule.scheduleJob("* * * * *", async () => {
        try {
            let last24Hours = new Date(
                new Date().getTime() - 24 * 60 * 60 * 1000
            );

            await ChangePasswordTokenModel.destroy({
                where: { createdAt: { [Op.lt]: last24Hours } }
            });
        } catch (error) {
            logger.error(error);
        }
    });
};
