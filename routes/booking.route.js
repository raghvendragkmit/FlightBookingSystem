const { bookTickets, getBookingDetails } = require("../controllers/booking.controller")
const { isSigned } = require("../middleware/isSignedIn")
const express = require("express")
const { isPassenger } = require("../middleware/isPassenger")
const router = express.Router()

router.post("/booktickets", isSigned, isPassenger, bookTickets);
router.get("/booktickets", isSigned, isPassenger, getBookingDetails);
module.exports = router
