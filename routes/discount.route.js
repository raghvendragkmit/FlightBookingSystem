const { deleteDiscounts, createDiscounts, getAllDiscounts } = require("../controllers/discount.controller")
const { isAdmin } = require("../middleware/IsAdmin")
const { isSigned } = require("../middleware/isSignedIn")
const express = require("express")
const router = express.Router()

router.post("/discounts", isSigned, isAdmin, createDiscounts)
router.delete("/discounts", isSigned, isAdmin, deleteDiscounts)
router.get("/discounts", isSigned, getAllDiscounts)
module.exports = router
