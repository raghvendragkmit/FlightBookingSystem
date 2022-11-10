const { doPayment } = require("../services/payment.service");
exports.payments = (req, res) => {
    doPayment(
        { ...req.body, status: "booked", userId: req.id },
        (err, result, status_code) => {
            return res.status(status_code).json(err ? err : result);
        }
    );
};
