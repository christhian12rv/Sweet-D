const Sequelize = require("sequelize");
const db = require("../db");

const OrderModel = require("./Order.model");

const User = db.define("user", {
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
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

User.associate = function (models) {
    User.belongsTo(models.Order, { foreignKey: "userId", as: "user" });
};

User.associate = function (models) {
    User.hasMany(models.Address, { foreignKey: "userId", sourceKey: "id" });
};

User.associate = function (models) {
    User.hasOne(models.ChangePasswordToken, {
        foreignKey: "userId",
        sourceKey: "id"
    });
};

module.exports = User;
