const { payments } = require("../controllers/payment.controller")
const { isSigned } = require("../middleware/isSignedIn")
const express = require("express")
const { isPassenger } = require("../middleware/isPassenger")
const router = express.Router()

router.post("/payments", isSigned, isPassenger, payments);
module.exports = router;
