const { createRoutes, getAllRoutes, deleteRoutes } = require("../controllers/routes.controller")
const { isAdmin } = require("../middleware/IsAdmin")
const { isSigned } = require("../middleware/isSignedIn")
const express = require("express")
const router = express.Router()

router.post("/routes", isSigned, isAdmin, createRoutes)
router.get("/routes", isSigned, isAdmin, getAllRoutes)
router.delete("/routes", isSigned, isAdmin, deleteRoutes)

module.exports = router
