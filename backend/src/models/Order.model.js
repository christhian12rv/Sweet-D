const Sequelize = require("sequelize");
const db = require("../db");

const UserModel = require("./User.model");

const Order = db.define("order", {
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
            model: "users",
            key: "id"
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
});

Order.associate = function (models) {
    Order.hasMany(models.User, { as: "users" });
};

Order.associate = function (models) {
    Order.hasOne(models.OrderAddress, {
        foreignKey: "orderId",
        sourceKey: "id"
    });
};

module.exports = Order;
