const db = require('../connection');



exports.get_All_Discount = (callback) => {

  db.query("SELECT * FROM Discounts", (err, result) => {
    if (err) {
      return callback({ error: err }, null, 503);
    }
    return callback(null, { "message": result }, 200)
  });

}





exports.create_Discount = (data, callback) => {
  db.query("INSERT into Discounts(offer) VALUES(?)", [data], (err, result) => {
    if (err) {
      return callback(err, null, 503)
    }
    return callback(null, { "message": "discount created successfully" }, 201);
  });

}


exports.apply_Discount = (data, callback) => {
  db.query(`SELECT Flights.airlineName, Bookings.id, Bookings.totalAmount FROM Flights INNER JOIN Bookings ON
  Bookings.flightId = Flights.id WHERE Bookings.passengerId = ? AND Bookings.id = ?`,
    [data.id, data.booking_Id], (err, result) => {
      if (err) {
        return callback(err, null, 503);
      }
      let amount = result[0].totalAmount;
      db.query(`SELECT * from Discounts WHERE id = ? AND availableOn = ?`, [data.coupon_Id, result[0].airlineName],
        (err, result1) => {
          if (err) {
            return callback(err, null, 503);
          } else if (result1.length == 0) {
            return callback(null, { error: "No Discounts available" }, 400)
          }
          let discount = result1[0].amount;
          db.query("UPDATE Bookings SET totalAmount = ? WHERE id = ?",
            [amount - discount, data.booking_Id],
            (err, result2) => {
              if (err) {
                return callback(err, null, 503);
              }
              return callback(null, { message: "Discounts applied" }, 200);
            }
          );
        }
      );
    }
  );
}
