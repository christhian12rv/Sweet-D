const Sequelize = require("sequelize");
const db = require("../../configs/db");

const ProductIngredientType = db.define("productIngredientType", {
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
    min: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
	max: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

ProductIngredientType.associate = (models) => {
    ProductIngredientType.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
    });
};

module.exports = ProductIngredientType;
