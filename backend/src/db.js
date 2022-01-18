const db = require("./configs/db.config");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    dialect: db.dialect,
    host: db.HOST
});

module.exports = sequelize;