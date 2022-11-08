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

// // exports.apply_Discounts = (req, res) => {

// //   apply_Discount({ id: req.id, booking_Id: req.body.bookingId,coupon_Id:req.body.couponId }, (err, result, status_code) => {
// //   });
// };
