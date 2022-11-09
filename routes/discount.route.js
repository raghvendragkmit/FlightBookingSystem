const {
    deleteDiscounts,
    createDiscounts,
    getAllDiscounts,
    applyDiscounts,
} = require("../controllers/discount.controller");
const { isAdmin } = require("../middleware/IsAdmin");
const { isSigned } = require("../middleware/isSignedIn");
const express = require("express");
const router = express.Router();
const { validate } = require("../helpers/validation");
const { body } = require("express-validator");

router.post(
    "/discounts",
    validate([body("offer", "offer cannot be empty").isInt()]),
    isSigned,
    isAdmin,
    createDiscounts
);
router.delete("/discounts", isSigned, isAdmin, deleteDiscounts);
router.get("/discounts", isSigned, getAllDiscounts);
router.post(
    "/applydiscounts",
    validate([
        body(
            "bookingId",
            "bookingId cannot be empty and must be an integer"
        ).isInt(),
        body(
            "couponId",
            "couponId cannot be empty and must be and integer"
        ).isInt(),
    ]),
    isSigned,
    applyDiscounts
);
module.exports = router;
