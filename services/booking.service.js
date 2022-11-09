const db = require("../connection");

exports.bookTicket = (data, callback) => {
    try {
        db.query(
            "Select capacity, ticketPrice FROM Flights WHERE id = ? ",
            [data.flightId],
            (err, result) => {
                if (err) {
                    return callback({ error: err }, null, 503);
                } else if (result && data.seats > result[0].capacity) {
                    return callback(
                        null,
                        {
                            message: `${result[0].capacity} seats available`,
                        },
                        400
                    );
                } else {
                    db.query(
                        "INSERT INTO Bookings(passengerId,flightId,totalAmount) values(?,?,?)",
                        [
                            data.id,
                            data.flightId,
                            data.seats * result[0].ticketPrice,
                        ],
                        (err, result1) => {
                            if (err) {
                                return callback({ error: err }, null, 503);
                            }
                            return callback(
                                null,
                                {
                                    message:
                                        "booking confirm proceed to payment",
                                },
                                201
                            );
                        }
                    );
                }
            }
        );
    } catch (err) {
        return callback(err, null, 503);
    }
};

exports.getBookingDetail = (data, callback) => {
    try {
        db.query(
            "SELECT * FROM Bookings WHERE passengerId = ?",
            [data.id],
            (err, result) => {
                if (err) {
                    return callback({ error: err }, null, 503);
                }
                return callback(null, { message: result }, 200);
            }
        );
    } catch (err) {
        return callback({ error: err }, null, 503);
    }
};
