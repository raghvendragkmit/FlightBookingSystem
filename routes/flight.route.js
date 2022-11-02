const { createFlights, deleteFlights } = require("../controllers/flights.controller")
const { isAdmin } = require("../middleware/IsAdmin")
const { isSigned } = require("../middleware/isSignedIn")
const express = require("express")
const router = express.Router()

router.post("/flights", isSigned, isAdmin, createFlights)
router.delete("/flights", isSigned, isAdmin, deleteFlights)

module.exports = router
