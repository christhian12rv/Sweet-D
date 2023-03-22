const Sequelize = require("sequelize");
const db = require("../../configs/db");

const Product = db.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    photos: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Product.associate = function (models) {
    Product.hasMany(models.ProductSize, { as: "sizes" });
    Product.hasMany(models.ProductIngredient, { as: "ingredients" });
    Product.hasMany(models.ProductIngredientType, { as: "ingredientTypes" });
    Product.hasMany(models.OrderProduct, { as: "orderProducts" });
};

module.exports = Product;
