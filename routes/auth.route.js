const { login, registerPassenger } = require("../controllers/auth.controller")
const { signOut } = require("../controllers/signOut")
const express = require("express")
const router = express.Router()

router.post("/signup", registerPassenger)
router.post("/login", login)
router.get("/signout", signOut)

module.exports = router
