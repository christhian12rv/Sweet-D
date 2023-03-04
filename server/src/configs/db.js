const config = require("../configs/config");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: true,
        native:true
    },
    host: config.dbHost,
    port: config.dbPort,
    logging: false,
});

module.exports = sequelize;