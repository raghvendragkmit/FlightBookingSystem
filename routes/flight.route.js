const {
    createFlights,
    deleteFlights,
    searchFlights,
    allFlights,
} = require("../controllers/flights.controller");
const { isAdmin } = require("../middleware/IsAdmin");
const { isSigned } = require("../middleware/isSignedIn");
const express = require("express");
const { validate } = require("../helpers/validation");
const { body } = require("express-validator");
const router = express.Router();

router.post(
    "/flights",
    validate([
        body("airlineName", "airlineName is required").isString().trim(),
        body("routeId", "routedId is required and must be an integer").isInt(),
        body("capacity", "takeOffTime is required").isInt(),
        body("ticketPrice", "ticketPrice is required").isInt(),
        body("date", "Date is required").trim().isDate(),
        body("takeOffTime").exists().trim().isString(),
        body("landingTime").exists().trim().isString(),
    ]),
    isSigned,
    isAdmin,
    createFlights
);
router.delete("/flights", isSigned, isAdmin, deleteFlights);
router.get(
    "/searchflights",
    validate([
        body("source", "source is required").isString().trim(),
        body("destination", "routedId is required and must be an integer")
            .isString()
            .trim(),
    ]),
    isSigned,
    searchFlights
);
router.get("/flights", isSigned, isAdmin, allFlights);
module.exports = router;
