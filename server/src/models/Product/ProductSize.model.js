const Sequelize = require("sequelize");
const db = require("../../configs/db");

const ProductSize = db.define("productSize", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "products",
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

ProductSize.associate = (models) => {
    ProductSize.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
    });
};

module.exports = ProductSize;
