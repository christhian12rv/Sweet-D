const Sequelize = require("sequelize");
const db = require("../configs/db");

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
        allowNull: false
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
    Product.hasMany(models.ProductSize, { as: "productSizes" });
    Product.hasMany(models.ProductIngredient, { as: "productIngredients" });
    Product.hasMany(models.ProductIngredientType, { as: "productIngredientTypes" });
    Product.hasMany(models.OrderProduct, { as: "orderProducts" });
};

module.exports = Product;
