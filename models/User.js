const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                isUnique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM("passenger", "admin"),
                defaultValue: "passenger",
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
    return User;
};
