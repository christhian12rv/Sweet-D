const Sequelize = require("sequelize");
const db = require("../../configs/db");

const ChangePasswordToken = db.define("changePasswordToken", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    token: {
        type: Sequelize.STRING(300),
        required: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

ChangePasswordToken.associate = function (models) {
    ChangePasswordToken.belongsTo(models.User, {
        foreignKey: "userId",
    });
};

module.exports = ChangePasswordToken;
