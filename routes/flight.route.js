const { createFlights, deleteFlights, searchFlights } = require("../controllers/flights.controller")
const { isAdmin } = require("../middleware/IsAdmin")
const { isSigned } = require("../middleware/isSignedIn")
const { isPassenger } = require("../middleware/isPassenger")
const express = require("express")
const router = express.Router()

router.post("/flights", isSigned, isAdmin, createFlights)
router.delete("/flights", isSigned, isAdmin, deleteFlights)
router.get("/flights", isSigned, isPassenger, searchFlights)
module.exports = router
