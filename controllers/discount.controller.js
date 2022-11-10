const {
    getAllDiscount,
    createDiscount,
    deleteDiscount,
    applyDiscount,
} = require("../services/discount.service");

exports.getAllDiscounts = (req, res) => {
    getAllDiscount((err, result, status_code) => {
        if (err) {
            return res.status(status_code).json({ err });
        }
        return res.status(status_code).json(result);
    });
};

exports.createDiscounts = (req, res) => {
    createDiscount(req.offer, (err, result, status_code) => {
        if (err) {
            return res.status(status_code).json(err);
        }
        return res.status(status_code).json(result);
    });
};

exports.deleteDiscounts = (req, res) => {
    const id = req.query.id;
    if (typeof id === "number") {
        deleteDiscount(id, (err, result, status_code) => {
            if (err) {
                return res.status(status_code).json(err);
            }
            return res.status(status_code).json(result);
        });
    } else {
        return res.status(400).json({ error: "id is required" });
    }
};

exports.applyDiscounts = (req, res) => {
    applyDiscount(
        {
            id: req.id,
            booking_Id: req.body.bookingId,
            coupon_Id: req.body.couponId,
        },
        (err, result, status_code) => {
            return res.status(status_code).json(err ? err : result);
        }
    );
};
