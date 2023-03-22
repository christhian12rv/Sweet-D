const Sequelize = require("sequelize");
const db = require("../configs/db");

const OrderProductIngredient = db.define("orderProductIngredient", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "orderProducts",
            key: "id"
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

OrderProductIngredient.associate = (models) => {
    OrderProductIngredient.belongsTo(models.OrderProduct, {
        foreignKey: 'orderProductId',
        as: 'orderProduct',
    });
};

module.exports = OrderProductIngredient;
