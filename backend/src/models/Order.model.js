const Sequelize = require('sequelize');
const db = require("../db");

const UserModel = require("./User.model");

const Order = db.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    total: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})

Order.associate = function (models) {
    Order.hasMany(models.User, { as: 'users' })
};

module.exports = Order;