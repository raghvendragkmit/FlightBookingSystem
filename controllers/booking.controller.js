const db = require("../connection");
const { bookTicket, getBookingDetail } = require("../services/booking.service");
exports.bookTickets = (req, res) => {
  bookTicket({ ...req.body, id: req.id }, (err, result, status_code) => {
    if (err) {
      return res.status(status_code).json(err);
    }
    return res.status(status_code).json(result);
  });
};

exports.bookingDetails = (req, res) => {
  getBookingDetail({ id: req.id }, (err, result, status_code) => {
    if (err) {
      return res.status(status_code).json({ err });
    }
    return res.status(200).json(result);
  });
};
