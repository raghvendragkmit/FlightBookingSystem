const db = require("../connection");

exports.createFlight = (data, callback) => {
    db.query(
        "INSERT INTO Flights(airlineName, routeId, takeOffTime, landingTime, capacity, ticketPrice, date) values(?,?,?,?,?,?,?)",
        [
            data.airlineName,
            data.routeId,
            data.takeOffTime,
            data.landingTime,
            data.capacity,
            data.ticketPrice,
            data.date,
        ],
        (err, result) => {
            if (err) return callback({ error: err }, null, 500);
            return callback(
                { message: "flight created successfully" },
                null,
                201
            );
        }
    );
};

exports.deleteFlight = (data, callback) => {
    db.query("DELETE FROM Flights WHERE id=?", [data], (err, result) => {
        if (err) {
            return callback(err, null, 503);
        }
        if (result.length == 0) {
            return callback({ error: "Not Found" }, null, 404);
        }
        return callback(null, { message: "Flight deleted successfully" }, 201);
    });
};

exports.searchFlight = (data, callback) => {
    db.query(
        "SELECT id FROM Routes WHERE source=? AND destination=?",
        [data.source, data.destination],
        (err, result) => {
            if (err) {
                return callback({ error: err }, null, 503);
            } else if (result.length >= 1) {
                db.query(
                    "SELECT id, airlineName,takeOffTime, landingTime, capacity, ticketPrice, DATE_FORMAT(date,'%y-%m-%d') as date from Flights WHERE routeId = ?",
                    [result[0].id],
                    (err, result1) => {
                        if (err) {
                            return callback(err, null, 503);
                        } else if (result1.length >= 1) {
                            return callback(null, result1, 200);
                        } else {
                            return callback(
                                { message: "No direct flights" },
                                null,
                                404
                            );
                        }
                    }
                );
            } else {
                return callback({ message: "No direct flights" }, null, 404);
            }
        }
    );
};

exports.getAllFlight = (callback) => {
    try {
        db.query(
            "SELECT *,DATE_FORMAT(date,'%y-%m-%d') as date FROM flights",
            (err, result) => {
                if (err) {
                    return callback({ error: err }, null, 503);
                }
                return callback(null, { result: result }, 200);
            }
        );
    } catch (err) {
        return callback({ error: err }, null, 503);
    }
};