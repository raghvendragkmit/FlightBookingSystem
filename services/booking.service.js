const Booking = require("../models/Index").db.Booking;
const Flight = require("../models/Index").db.Flight;

exports.bookTicket = async (data, callback) => {
    try {
        const flightData = await Flight.findOne({
            where: {
                id: data.flightId,
            },
        });
        if (!flightData) {
            return callback({ error: "Invalid flightId" }, null, 404);
        }
        const currentCapacity = flightData.dataValues.capacity;
        const flightFare = flightData.dataValues.ticketPrice;
        if (data.seats > currentCapacity) {
            return callback(
                null,
                { message: `${currentCapacity} seats available` },
                400
            );
        }

        data.totalAmount = data.seats * flightFare;

        const bookingData = {
            seatsBooked: data.seats,
            totalAmount: data.totalAmount,
            UserId: data.userId,
        };

        const bookingCreated = await Booking.create(bookingData);
        if (bookingCreated) {
            return callback(
                null,
                {
                    message: "Booking confrim proceed to payment",
                },
                201
            );
        }
    } catch (err) {
        return callback({ error: err }, null, 503);
    }
};

exports.getBookingDetail = async (data, callback) => {
    try {
        const bookingDetails = await Booking.findAll();
        if (bookingDetails) {
            return callback(null, { result: bookingDetails }, 200);
        } else {
            return callback({ error: "No bookings done yet" }, null, 400);
        }
    } catch (err) {
        return callback({ error: err }, null, 503);
    }
};
