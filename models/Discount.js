const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequelize) => {
    const Discount = sequelize.define(
        "Discount",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            availableOn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("active", "inactive"),
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
    return Discount;
};
