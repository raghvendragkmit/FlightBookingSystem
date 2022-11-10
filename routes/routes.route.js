const {
    createRoutes,
    allRoutes,
    deleteRoutes,
} = require("../controllers/routes.controller");
const { isAdmin } = require("../middleware/IsAdmin");
const { isSigned } = require("../middleware/isSignedIn");
const express = require("express");
const { validate } = require("../helpers/validation");
const { body } = require("express-validator");
const router = express.Router();
router.post(
    "/routes",
    validate([
        body("source", "source is required").isString().trim(),
        body("destination", "routedId is required and must be an integer")
            .isString()
            .trim(),
    ]),
    isSigned,
    isAdmin,
    createRoutes
);
router.get("/routes", isSigned, isAdmin, allRoutes);
router.delete("/routes", isSigned, isAdmin, deleteRoutes);

module.exports = router;
