const { payments } = require("../controllers/payment.controller");
const { isSigned } = require("../middleware/isSignedIn");
const express = require("express");
const router = express.Router();
const { validate } = require("../helpers/validation");
const { body } = require("express-validator");

router.post(
    "/payments",
    validate([
        body(
            "bookingId",
            "bookingId is required and must be an integer"
        ).isInt(),
        body("paymentMethod", "paymentMethod is required")
            .isString()
            .trim()
            .isLength({ min: 3 }),
    ]),
    isSigned,
    payments
);
module.exports = router;
