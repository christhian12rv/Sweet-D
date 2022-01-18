const Sequelize = require('sequelize');
const db = require("../db");

const Product = db.define('product', {
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
        type: Sequelize.STRING(5000),
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    storage: {
        type: Sequelize.INTEGER,
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
})

module.exports = Product;