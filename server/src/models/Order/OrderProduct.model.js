const Sequelize = require("sequelize");
const db = require("../../configs/db");

const OrderProduct = db.define("orderProduct", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "orders",
            key: "id"
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id"
        }
    },
    sizeName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sizePrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

OrderProduct.associate = function (models) {
    OrderProduct.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
    });
    OrderProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
    });
    OrderProduct.hasMany(models.OrderProductIngredient, { as: "orderProductIngredients" });
};

module.exports = OrderProduct;
