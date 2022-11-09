const {
    bookTickets,
    bookingDetails,
} = require("../controllers/booking.controller");
const { isSigned } = require("../middleware/isSignedIn");
const express = require("express");
const router = express.Router();
const { validate } = require("../helpers/validation");
const { body } = require("express-validator");

router.post(
    "/booktickets",
    validate([
        body("flightId", "flightId is required and must be an integer")
            .trim()
            .isInt(),
        body("seats", "flightId is required and must be an integer")
            .trim()
            .isInt(),
    ]),
    isSigned,
    bookTickets
);
router.get("/booktickets", isSigned, bookingDetails);
module.exports = router;
