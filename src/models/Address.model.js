const Sequelize = require("sequelize");
const db = require("../configs/db");

const Address = db.define("address", {
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
    address: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    number: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    postalCode: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    state: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    district: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    complement: {
        type: Sequelize.STRING(500),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(15),
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Address.associate = function (models) {
    Address.belongsTo(models.User, { foreignKey: "userId", targetKey: "id" });
};

module.exports = Address;
