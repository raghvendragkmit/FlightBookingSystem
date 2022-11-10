const Flight = require("../models/Flight");

const sequelize = require("../models/Index").db.sequelize;
const Booking = require("../models/Index").db.Booking;
const Payment = require("../models/Index").db.Payment;

exports.doPayment = async (data, callback) => {
    const t = await sequelize.transaction();

    try {
        const bookingData = await Booking.findOne(
            {
                where: {
                    id: data.bookingId,
                    UserId: data.userId,
                },
            },
            { transaction: t }
        );

        console.log(bookingData.dataValues.bookingStatus);
        if (!bookingData || bookingData.dataValues.bookingStatus == "confirm") {
            console.log("here");
            await t.rollback();
            return callback({ error: "Transaction failed" }, null, 400);
        }

        const paymentCreated = await Payment.create(
            {
                paymentMethod: data.paymentMethod,
                BookingId: data.bookingId,
            },
            { transaction: t }
        );

        if (!paymentCreated) {
            await t.rollback();
            return callback({ error: "Transaction failed" }, null, 400);
        }

        console.log(paymentCreated);

        const updateBooking = await Booking.update(
            {
                bookingStatus: "booked",
            },
            {
                where: {
                    id: data.bookingId,
                },
            }
        );

        console.log(updateBooking);
        if (!updateBooking) {
            await t.rollback();
            return callback({ error: "Transaction failed" }, null, 400);
        }

        const flightId = bookingData.dataValues.FlightId;
        const flightData = await Flight.findOne({
            where: {
                id: flightId,
            },
        });

        console.log(flightData);

        console.log();

        const seatsBooked = bookingData.dataValues.seatsBooked;

        await flightData.decrement({
            capacity: seatsBooked,
        });

        await t.commit();
        return callback(null, { result: "Transaction successfull" }, 200);
    } catch (error) {
        await t.rollback();
        return callback({ error: "Transaction failed" }, null, 400);
    }
};
