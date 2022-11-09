const db = require("../connection");

exports.doPayment = (data, callback) => {
    db.query(
        "SELECT totalAmount FROM Bookings WHERE id = ? AND passengerId = ?",
        [data.bookingId, data.id],
        (err, result) => {
            if (err) {
                return callback({ error: err }, null, 503);
            } else if (!result) {
                return callback(null, { message: "No bookings yet" }, 400);
            } else if (result[0].status == "confirm") {
                db.query(
                    "INSERT INTO Payments(bookingId,paymentType) VALUES(?,?)",
                    [data.bookingId, data.paymentType],
                    (err, result1) => {
                        if (err) {
                            return callback({ error: err }, null, 503);
                        }
                        db.query(
                            "UPDATE Bookings SET status = ? WHERE id = ?",
                            [data.status, data.bookingId],
                            (err, result2) => {
                                if (err) {
                                    return callback({ error: err }, null, 503);
                                }
                                return callback(
                                    null,
                                    { message: "Success, Payment done" },
                                    201
                                );
                            }
                        );
                    }
                );
            } else {
                return callback(null, { message: "Payment already done" }, 409);
            }
        }
    );
};
