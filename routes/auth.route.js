const { login, registerPassenger, signOut } = require("../controllers/auth.controller")
const express = require("express")
const router = express.Router()

router.post("/signup", registerPassenger)
router.post("/login", login)
router.get("/signout", signOut)

module.exports = router
