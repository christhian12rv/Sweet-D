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
    finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Order.associate = function (models) {
    Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
    });
};

Order.associate = function (models) {
    Order.hasMany(models.OrderProduct, { as: "orderProducts" });
};

module.exports = Order;
