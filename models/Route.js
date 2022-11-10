const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequelize) => {
    const Route = sequelize.define(
        "Route",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            source: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            destination: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
    return Route;
};
