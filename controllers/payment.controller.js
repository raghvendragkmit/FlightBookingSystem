const db = require('../connection');

exports.payments = async (req, res) => {
  const bookingId = req.body.bookingId;
  const paymentType = req.body.paymentType;
  const status = "booked";

  if (!bookingId || !paymentType) {
    return res.status(400).json({
      " message": "Please enter required details"
    })
  }
  db.query("select totalAmount from Bookings where id = ? AND passengerId = ?", [bookingId, req.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        "error": err
      })
    }
    if (result[0].status == "confirm") {
      db.query("INSERT INTO Payments(bookingId,paymentType) values(?,?)", [bookingId, paymentType], (err, result) => {
        if (err) {
          return res.status(500).json({
            "error": err
          })
        }
        db.query("UPDATE Bookings set status = ? where id = ?", [status, bookingId], (err, result) => {
          if (err) {
            return res.status(500).json({
              "error": err
            })
          }
          return res.status(200).json({ "message": "success" });
        })
      })
    }
    else {
      return res.status(409).json({
        "message": "already done"
      })
    }
  })


}
