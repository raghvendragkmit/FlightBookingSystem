const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequelize) => {
    const Flight = sequelize.define(
        "Flight",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            airlineName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            takeOffTime: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            landingTime: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ticketPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
    return Flight;
};
