const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequelize) => {
    const Booking = sequelize.define(
        "Booking",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            bookingStatus: {
                type: DataTypes.ENUM("confirm", "booked"),
                defaultValue: "confirm",
                allowNull: false,
            },
            bookingTime: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            totalAmount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            seatsBooked: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
    return Booking;
};
