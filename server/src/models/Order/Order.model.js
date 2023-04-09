const Sequelize = require("sequelize");
const db = require("../../configs/db");

const Order = db.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id"
        }
    },
    date: {
        type: Sequelize.DATE,
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

module.exports = Order;
