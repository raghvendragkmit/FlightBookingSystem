const Discount = require("../models/Index").db.Discount;
const Booking = require("../models/Index").db.Booking;

exports.getAllDiscount = async (callback) => {
    try {
        const discount = await Discount.findAll();
        if (discount) {
            return callback(null, { result: discount }, 200);
        }
    } catch (error) {
        return callback({ error: err }, null, 503);
    }
};

exports.createDiscount = async (data, callback) => {
    try {
        const discountCreated = await Discount.create(data);
        if (discountCreated) {
            return callback(
                null,
                { message: "Discount created successfully" },
                201
            );
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
        callback(null, { result: discount }, 200);
    }
};

exports.applyDiscount = async (data, callback) => {
    try {
        const bookingData = await Booking.findOne({
            where: {
                id: data.bookingId,
            },
        });

        if (!bookingData) {
            return callback({ error: "Wrong booking id" }, null, 400);
        }

        const couponData = await Discount.findOne({
            where: {
                id: data.discountId,
            },
        });

        if (!couponData) {
            return callback({ error: "Invalid coupon id" }, null, 400);
        }

        const appliedDiscount = await Booking.update(
            {
                DiscountId: data.discountId,
            },
            {
                where: {
                    id: data.bookingId,
                },
            }
        );

        if (appliedDiscount) {
            return callback(
                null,
                { message: "Discount Applied Successfully" },
                200
            );
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};
