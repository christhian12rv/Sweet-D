const config = require("../configs/config");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    dialect: "mysql",
    host: config.dbHost,
    port: config.dbPort,
    logging: false,
});

module.exports = sequelize;