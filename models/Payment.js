const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequelize) => {
    const Payment = sequelize.define(
        "Payment",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            paymentMethod: {
                type: DataTypes.ENUM("card", "upi"),
                allowNull: false,
            },
            paymentTime: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
    return Payment;
};
