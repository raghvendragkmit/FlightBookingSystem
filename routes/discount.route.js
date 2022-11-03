const {
	deleteDiscounts,
	createDiscounts,
	getAllDiscounts,
	applyDiscounts,
} = require("../controllers/discount.controller")
const { isAdmin } = require("../middleware/IsAdmin")
const { isSigned } = require("../middleware/isSignedIn")
const express = require("express")
const { isPassenger } = require("../middleware/isPassenger")
const router = express.Router()

router.post("/discounts", isSigned, isAdmin, createDiscounts)
router.delete("/discounts", isSigned, isAdmin, deleteDiscounts)
router.get("/discounts", isSigned, isPassenger, getAllDiscounts)
router.post("/applydiscounts", isSigned, isPassenger, applyDiscounts)
module.exports = router
