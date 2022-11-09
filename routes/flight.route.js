const { createFlights, deleteFlights, searchFlights } = require("../controllers/flights.controller")
const { isAdmin } = require("../middleware/IsAdmin")
const { isSigned } = require("../middleware/isSignedIn")
const express = require("express")
const { validate } = require("../helpers/validation");
const { body } = require('express-validator');
const router = express.Router()

router.post("/flights", validate([
  body("airlineName", "airlineName is required").isString().trim(),
  body("routeId", "routedId is required and must be an integer").isInt(),
  body("capacity", "takeOffTime is required").isInt(),
  body("ticketPrice", "ticketPrice is required").isInt(),
  body("date", "Date is required").trim().isDate(),
  body('takeOffTime').exists(),
  body('landingTime').exists()
]),
  isSigned, isAdmin, createFlights);
router.delete("/flights", isSigned, isAdmin, deleteFlights);
router.get("/flights", isSigned, searchFlights);
module.exports = router;


