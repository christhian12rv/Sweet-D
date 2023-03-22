const Sequelize = require("sequelize");
const db = require("../configs/db");

const ProductIngredient = db.define("productIngredient", {
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
    type: {
        type: Sequelize.ENUM('Dough', 'Filling'),
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

ProductIngredient.associate = (models) => {
    ProductIngredient.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
    });
};

module.exports = ProductIngredient;