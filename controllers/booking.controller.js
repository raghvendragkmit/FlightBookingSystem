const { bookTicket, getBookingDetail } = require("../services/booking.service");
exports.bookTickets = (req, res) => {
    bookTicket({ ...req.body, userId: req.id }, (err, result, status_code) => {
        return res.status(status_code).json(err ? err : result);
    });
};

exports.bookingDetails = (req, res) => {
    getBookingDetail({ userId: req.id }, (err, result, status_code) => {
        return res.status(status_code).json(err ? err : result);
    });
};
