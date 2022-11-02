const { searchFlights } = require("../controllers/searchflights.controller")
const express = require("express")
const router = express.Router()
const { isSigned } = require("../middleware/isSignedIn")
const { isPassenger } = require("../middleware/isPassenger")

router.get("/flights", isSigned, isPassenger, searchFlights)
module.exports = router
