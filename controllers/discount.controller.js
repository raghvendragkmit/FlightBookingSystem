const db = require("../connection");
const { get_All_Discount, create_Discount, delete_Discount } = require("../services/discount.service");


exports.get_All_Discounts = (req, res) => {
  get_All_Discount((err, result, status_code) => {
    if (err) {
      return res.status(status_code).json({ err });
    }
    return res.status(status_code).json(result);
  })
};

exports.create_Discounts = (req, res) => {
  create_Discount(req.offer, (err, result, status_code) => {
    if (err) {
      return res.status(status_code).json(err);
    }
    return res.status(status_code).json(result);
  })

};

exports.delete_Discounts = (req, res) => {
  const id = req.query.id;
  if (typeof id === "number") {
    delete_Discount(id, (err, result, status_code) => {
      if (err) {
        return res.status(status_code).json(err);
      }
      return res.status(status_code).json(result);
    })
  }
  else {
    return res.status(400).json({ "error": "id is required" });
  }
};

exports.applyDiscounts = (req, res) => {
  const bookingId = req.body.bookingId;
  const couponId = req.body.couponId;
  let amount = 0,
    discount = 0;
  if (!bookingId || !couponId) {
    return res
      .status(400)
      .json({ message: "Please enter booking id and coupon id" });
  }
  db.query(
    "select Flights.airlineName, Bookings.id, Bookings.totalAmount from Flights INNER JOIN Bookings ON Bookings.flightId  = Flights.id where Bookings.passengerId = ? AND Bookings.id = ?",
    [req.id, bookingId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      amount = result[0].totalAmount;
      db.query(
        "select * from Discounts where id = ? AND availableOn = ?",
        [couponId, result[0].airlineName],
        (err, result1) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else if (result1.length == 0) {
            return res
              .status(200)
              .json({ message: "No discounts available on booking" });
          }
          discount = result1[0].amount;
          db.query(
            "update Bookings set totalAmount = ? where id = ?",
            [amount - discount, bookingId],
            (err, result2) => {
              if (err) {
                return res.status(500).json({ error: err });
              }
              return res.status(200).json({ message: "discount applied" });
            }
          );
        }
      );
    }
  );
};
