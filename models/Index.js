const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("flightbookingsequalize", "root", "ragh@123", {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./User")(Sequelize, sequelize);
db.Flight = require("./Flight")(Sequelize, sequelize);
db.Route = require("./Route")(Sequelize, sequelize);
db.Discount = require("./Discount")(Sequelize, sequelize);
db.Booking = require("./Booking")(Sequelize, sequelize);
db.Payment = require("./Payment")(Sequelize, sequelize);

db.Discount.hasOne(db.Booking);
db.Booking.belongsTo(db.Discount);

db.User.hasMany(db.Booking, {
    foreignKey: {
        allowNull: false,
    },
});
db.Booking.belongsTo(db.User);

db.Booking.hasOne(db.Payment, {
    foreignKey: {
        allowNull: false,
    },
});
db.Payment.belongsTo(db.Booking);

db.Route.hasOne(db.Flight, {
    foreignKey: {
        allowNull: false,
    },
});

db.Flight.belongsTo(db.Route);

const myfun = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { db, myfun };
